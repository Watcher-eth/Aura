import { getAddress, isAddress } from "viem";

const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

// Chain ID to Etherscan API URL mapping
const CHAIN_APIS = {
  1: "https://api.etherscan.io/api",
  137: "https://api.polygonscan.com/api",
  42161: "https://api.arbiscan.io/api",
  10: "https://api-optimistic.etherscan.io/api",
  8453: "https://api.basescan.org/api",
  56: "https://api.bscscan.com/api",
  324: "https://api.zksync.io/api"
} as const;

export const SUPPORTED_CHAINS = Object.keys(CHAIN_APIS).map(Number);

interface SearchResult {
  chain: number;
  address: string;
  name: string;
  ticker: string;
  type: string;
  image?: string | null;
  marketCap?: number | string;
  holders?: number | string;
}

export async function searchContracts(query: string): Promise<SearchResult[]> {
  if (!isAddress(query)) {
    console.log("Not a valid address, skipping search");
    return [];
  }

  if (!COVALENT_API_KEY || !ETHERSCAN_API_KEY) {
    throw new Error("API keys not found");
  }

  const address = getAddress(query);

  // Step 1: Find all chains where this contract exists
  const findContractChains = async (): Promise<number[]> => {
    const chainChecks = SUPPORTED_CHAINS.map(async (chainId) => {
      try {
        const apiUrl = CHAIN_APIS[chainId as keyof typeof CHAIN_APIS];
        const url = `${apiUrl}?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        return data.status === "1" ? chainId : null;
      } catch (error) {
        console.error(`Error checking chain ${chainId}:`, error);
        return null;
      }
    });

    const results = await Promise.all(chainChecks);
    return results.filter((chainId): chainId is number => chainId !== null);
  };

  // Step 2: Get metadata for a contract on a specific chain
  const getContractMetadata = async (chainId: number): Promise<SearchResult | null> => {
    try {
      // Try token details endpoint first
      const tokenUrl = `https://api.covalenthq.com/v1/${chainId}/tokens/${address}/?key=${COVALENT_API_KEY}`;
      const tokenResponse = await fetch(tokenUrl);
      const tokenData = await tokenResponse.json();

      if (tokenResponse.ok && tokenData?.data?.items?.[0]) {
        const token = tokenData.data.items[0];
        return {
          chain: chainId,
          address: address,
          name: token.contract_name || "Unknown Token",
          ticker: token.contract_ticker_symbol || "",
          type: token.supports_erc?.includes("erc721") ? "nft" : "token",
          image: token.logo_url,
          marketCap: token.market_cap_usd,
          holders: token.total_supply
        };
      }

      // If not found as token, try balances endpoint
      const balanceUrl = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${COVALENT_API_KEY}`;
      const balanceResponse = await fetch(balanceUrl);
      const balanceData = await balanceResponse.json();

      if (balanceResponse.ok && balanceData?.data?.items) {
        const contractItem = balanceData.data.items.find(
          (item: any) => item.contract_address?.toLowerCase() === address.toLowerCase()
        );

        if (contractItem) {
          return {
            chain: chainId,
            address: address,
            name: contractItem.contract_name || "Unknown Token",
            ticker: contractItem.contract_ticker_symbol || "",
            type: contractItem.supports_erc?.includes("erc721") ? "nft" : "token",
            image: contractItem.logo_url,
            marketCap: contractItem.quote_rate,
            holders: contractItem.total_supply
          };
        }
      }

      // If still no metadata, return basic contract info
      return {
        chain: chainId,
        address: address,
        name: "Unknown Contract",
        ticker: "",
        type: "contract",
        image: null,
        marketCap: null,
        holders: null
      };
    } catch (error) {
      console.error(`Error fetching metadata for chain ${chainId}:`, error);
      return null;
    }
  };

  // Step 1: Find all chains where the contract exists
  console.log("Finding chains with contract:", address);
  const contractChains = await findContractChains();
  console.log("Found contract on chains:", contractChains);

  if (contractChains.length === 0) {
    return [];
  }

  // Step 2: Fetch metadata for all found contracts in parallel
  console.log("Fetching metadata for all chains...");
  const metadataPromises = contractChains.map(chainId => getContractMetadata(chainId));
  const results = await Promise.all(metadataPromises);

  // Filter out null results and return
  return results.filter((result): result is SearchResult => result !== null);
}

export async function fetchContractMetadata(address: string, chainId: number) {
  if (!COVALENT_API_KEY) {
    throw new Error("Covalent API key not found");
  }

  try {
    const normalizedAddress = getAddress(address);
    
    // Fetch token metadata
    const tokenUrl = `https://api.covalenthq.com/v1/${chainId}/tokens/${normalizedAddress}/?key=${COVALENT_API_KEY}`;
    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();

    // Fetch balance data
    const balanceUrl = `https://api.covalenthq.com/v1/${chainId}/address/${normalizedAddress}/balances_v2/?key=${COVALENT_API_KEY}`;
    const balanceResponse = await fetch(balanceUrl);
    const balanceData = await balanceResponse.json();

    // Fetch holders count using the correct endpoint structure
    const holdersUrl = `https://api.covalenthq.com/v1/${chainId}/tokens/${normalizedAddress}/token_holders_v2/?key=${COVALENT_API_KEY}&page-size=1`;
    const holdersResponse = await fetch(holdersUrl);
    const holdersData = await holdersResponse.json();

    console.log("Holders Data:", JSON.stringify(holdersData, null, 2));

    const tokenInfo = tokenData?.data?.items?.[0];
    const balanceInfo = balanceData?.data?.items?.find(
      (item: any) => item.contract_address?.toLowerCase() === normalizedAddress.toLowerCase()
    );

    if (!tokenInfo && !balanceInfo) {
      return null;
    }

    const info = tokenInfo || balanceInfo;
    
    // Get holders count from the response
    const holdersCount = holdersData?.data?.pagination?.total_count || info?.total_supply || 0;

    return {
      address: normalizedAddress,
      chainId: chainId,
      name: info?.contract_name || "Unknown Contract",
      ticker: info?.contract_ticker_symbol || "",
      type: info?.supports_erc?.includes("erc721") ? "NFT" : 
            info?.supports_erc?.includes("erc20") ? "Token" : "Contract",
      image: info?.logo_url,
      marketCap: info?.market_cap_usd || info?.quote_rate,
      holders: holdersCount,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error fetching contract metadata:", error);
    return null;
  }
}
