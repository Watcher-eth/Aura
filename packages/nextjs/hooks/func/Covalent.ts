import { getAddress, isAddress } from "viem";

const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

export const SUPPORTED_CHAINS = [1, 137, 42161, 10, 8453, 56, 324];

// Mapping of chain IDs to Covalent chain names
const CHAIN_NAMES: { [key: number]: string } = {
  1: "eth-mainnet",
  137: "matic-mainnet",
  42161: "arbitrum-mainnet",
  10: "optimism-mainnet",
  8453: "base-mainnet",
  56: "bsc-mainnet",
  324: "zksync-mainnet"
};

export function getCovalentChainName(chainId: number): string {
  return CHAIN_NAMES[chainId] || `eth-mainnet`;
}

interface SearchResult {
  chain: number;
  address: string;
  name: string;
  ticker: string;
  type: string;
  image: string | null;
  marketCap?: number;
  holders?: number | string;
}

async function getContractType(address: string, chainId: number): Promise<string> {
  if (!ETHERSCAN_API_KEY) {
    console.warn("Etherscan API key not found");
    return "Unknown";
  }

  try {
    const url = `https://api.etherscan.io/v2/api?chainid=${chainId}&module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "1" && data.result) {
      const abi = JSON.parse(data.result);
      
      // Check for standard interfaces
      const hasERC20 = abi.some((item: any) => 
        ["transfer", "transferFrom", "approve"].every(method => 
          abi.some((abiItem: any) => abiItem.name === method)
        )
      );
      
      const hasERC721 = abi.some((item: any) => 
        ["safeTransferFrom", "ownerOf", "balanceOf"].every(method => 
          abi.some((abiItem: any) => abiItem.name === method)
        )
      );

      const hasERC1155 = abi.some((item: any) => 
        ["safeTransferFrom", "balanceOf", "safeBatchTransferFrom"].every(method => 
          abi.some((abiItem: any) => abiItem.name === method)
        )
      );

      if (hasERC1155) return "ERC1155";
      if (hasERC721) return "ERC721";
      if (hasERC20) return "ERC20";
      return "Custom";
    }
    
    return "Unknown";
  } catch (error) {
    console.error("Error fetching contract type:", error);
    return "Unknown";
  }
}

async function getContractMetadata(address: string, chainId: number, contractType: string) {
  try {
    const chainName = getCovalentChainName(chainId);
    console.log("Fetching metadata for", chainName, address, contractType);

    // Helper function to fetch and handle JSON responses
    const fetchJson = async (url: string) => {
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          console.log(`Failed to fetch ${url}:`, response.status);
          return null;
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching:", url, error);
        return null;
      }
    };

    // For ERC20 tokens, try multiple endpoints in parallel
    const [tokenData, priceData] = await Promise.all([
      fetchJson(`https://api.covalenthq.com/v1/${chainName}/tokens/${address}/token_holders_v2/?key=${COVALENT_API_KEY}`),
      fetchJson(`https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainName}/USD/${address}/?key=${COVALENT_API_KEY}`)
    ]);

    // First check token data from holders endpoint
    if (tokenData?.data?.items?.[0]) {
      const info = tokenData.data.items[0];
      console.log("Found token in holders data:", info);
      return {
        contract_name: info.contract_name,
        contract_ticker_symbol: info.contract_ticker_symbol,
        logo_url: info.logo_url,
        total_supply: info.total_supply,
        total_count: tokenData.data.pagination.total_count,
        quote_rate: info.quote_rate || 0,
        floor_price_quote: null
      };
    }

    // Check price data
    if (priceData?.data?.[0]?.items?.[0]) {
      const info = priceData.data[0].items[0];
      console.log("Found token in price data:", info);
      return {
        contract_name: info.contract_name || `${contractType} Token`,
        contract_ticker_symbol: info.contract_ticker_symbol || "",
        logo_url: info.logo_url,
        total_supply: info.total_supply || 0,
        total_count: info.total_supply || 0,
        quote_rate: info.price || 0,
        floor_price_quote: null
      };
    }

    // If it's an NFT, try NFT-specific endpoints
    if (contractType === "ERC721" || contractType === "ERC1155") {
      const nftData = await fetchJson(
        `https://api.covalenthq.com/v1/${chainName}/tokens/${address}/nft_token_ids/?key=${COVALENT_API_KEY}`
      );

      if (nftData?.data?.items?.[0]) {
        const tokenId = nftData.data.items[0].token_id;
        const metadataData = await fetchJson(
          `https://api.covalenthq.com/v1/${chainName}/tokens/${address}/nft_metadata/${tokenId}/?key=${COVALENT_API_KEY}`
        );

        if (metadataData?.data?.items?.[0]) {
          const nftInfo = metadataData.data.items[0];
          console.log("Found NFT metadata:", nftInfo);
          return {
            contract_name: nftInfo.contract_name,
            contract_ticker_symbol: nftInfo.contract_ticker_symbol,
            logo_url: nftInfo.nft_data?.[0]?.external_data?.image || nftInfo.logo_url,
            total_supply: nftData.data.pagination.total_count,
            total_count: tokenData?.data?.pagination?.total_count || 0,
            quote_rate: 0,
            floor_price_quote: null
          };
        }
      }
    }

    // Try one last time with token metadata
    const metadataData = await fetchJson(
      `https://api.covalenthq.com/v1/${chainName}/tokens/${address}/metadata/?key=${COVALENT_API_KEY}`
    );

    if (metadataData?.data?.items?.[0]) {
      const info = metadataData.data.items[0];
      console.log("Found token in metadata:", info);
      return {
        contract_name: info.contract_name,
        contract_ticker_symbol: info.contract_ticker_symbol,
        logo_url: info.logo_url,
        total_supply: info.total_supply,
        total_count: info.total_supply,
        quote_rate: info.quote_rate || 0,
        floor_price_quote: null
      };
    }

    console.log("No metadata found for token");
    return null;
  } catch (error) {
    console.error("Error in getContractMetadata:", error);
    return null;
  }
}

export async function searchContracts(query: string): Promise<SearchResult[]> {
  if (!isAddress(query)) {
    console.log("Not a valid address, skipping search");
    return [];
  }

  const address = getAddress(query);
  
  // Get contract types for all chains in parallel
  const contractTypePromises = SUPPORTED_CHAINS.map(async chainId => {
    try {
      const contractType = await getContractType(address, chainId);
      return { chainId, contractType };
    } catch (error) {
      console.error(`Error getting contract type for chain ${chainId}:`, error);
      return { chainId, contractType: "Unknown" };
    }
  });

  const contractTypes = await Promise.all(contractTypePromises);
  const validChains = contractTypes.filter(({ contractType }) => contractType !== "Unknown");

  // Fetch metadata for all valid chains in parallel
  const metadataPromises = validChains.map(async ({ chainId, contractType }) => {
    try {
      const metadata = await getContractMetadata(address, chainId, contractType);
      if (metadata) {
        const result = {
          chain: chainId,
          address,
          name: metadata.contract_name || "Unknown Contract",
          ticker: metadata.contract_ticker_symbol || "",
          type: contractType,
          image: metadata.logo_url || null,
          marketCap: metadata.quote_rate || metadata.floor_price_quote || 0,
          holders: metadata.total_supply || metadata.total_count || 0
        };
        console.log(`Found token on chain ${chainId}:`, result);
        return result;
      }
    } catch (error) {
      console.error(`Error fetching metadata for chain ${chainId}:`, error);
    }
    return null;
  });

  const metadataResults = await Promise.all(metadataPromises);
  const validResults = metadataResults.filter((result): result is SearchResult => 
    result !== null && result.name !== "Unknown Contract"
  );

  console.log("Final results:", validResults);
  return validResults;
}

export async function fetchContractMetadata(address: string, chainId: number) {
  if (!COVALENT_API_KEY) {
    throw new Error("Covalent API key not found");
  }

  try {
    const chainName = getCovalentChainName(chainId);
    const normalizedAddress = getAddress(address);
    
    // Get contract type first
    const contractType = await getContractType(normalizedAddress, chainId);
    console.log("Contract type:", contractType);

    const fetchWithContentCheck = async (url: string) => {
      const response = await fetch(url);
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      throw new Error(`Invalid response type: ${contentType}`);
    };

    // Get holders count for any contract type
    const holdersUrl = `https://api.covalenthq.com/v1/${chainName}/tokens/${normalizedAddress}/token_holders_v2/?key=${COVALENT_API_KEY}&page-size=1000`;
    const holdersData = await fetchWithContentCheck(holdersUrl);
    console.log("Token Holders Data:", holdersData);

    const holdersCount = holdersData?.data?.pagination?.total_count || 0;

    // Get market data
    const priceUrl = `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainName}/USD/${normalizedAddress}/`;
    const priceResponse = await fetch(`${priceUrl}?key=${COVALENT_API_KEY}`);
    const priceData = await priceResponse.json();
    console.log("Price Data:", priceData);

    const latestPrice = priceData?.data?.[0]?.items?.[0]?.price || 0;
    // Extract token info from price data if available
    const priceTokenInfo = priceData?.data?.[0];

    // Determine the actual contract type
    const detectedType = (contractType === "Custom" && holdersCount > 0 && latestPrice > 0) 
      ? "ERC20" 
      : contractType;

    console.log(`Contract type ${contractType} detected as ${detectedType}`);

    if (detectedType === "ERC721" || detectedType === "ERC1155") {
      // For NFTs, use the NFT-specific endpoints
      const nftUrl = `https://api.covalenthq.com/v1/${chainName}/tokens/${normalizedAddress}/nft_token_ids/?key=${COVALENT_API_KEY}`;
      const nftData = await fetchWithContentCheck(nftUrl);
      console.log("NFT Data:", nftData);

      // Get floor price
      const floorPriceUrl = `https://api.covalenthq.com/v1/${chainName}/nft_market/${normalizedAddress}/floor_price/?key=${COVALENT_API_KEY}`;
      const floorPriceData = await fetchWithContentCheck(floorPriceUrl);
      console.log("Floor Price Data:", floorPriceData);

      // Get unique holders count for NFTs
      const uniqueHolders = new Set();
      holdersData?.data?.items?.forEach((item: any) => {
        if (item.address) {
          uniqueHolders.add(item.address.toLowerCase());
        }
      });

      const floorPrice = floorPriceData?.data?.items?.[0]?.floor_price_quote_7d?.value || 
                        floorPriceData?.data?.items?.[0]?.floor_price_quote_24h?.value || 
                        floorPriceData?.data?.items?.[0]?.floor_price_quote || 0;

      if (nftData?.data?.items?.length > 0) {
        // Get collection metadata using the first token
        const metadataUrl = `https://api.covalenthq.com/v1/${chainName}/tokens/${normalizedAddress}/nft_metadata/${nftData.data.items[0].token_id}/?key=${COVALENT_API_KEY}`;
        const metadataData = await fetchWithContentCheck(metadataUrl);
        console.log("NFT Metadata:", metadataData);

        if (metadataData?.data?.items?.[0]) {
          const nftInfo = metadataData.data.items[0];
          const totalSupply = nftData.data.pagination.total_count;

          return {
            address: normalizedAddress,
            chainId: chainId,
            name: nftInfo.contract_name || "Unknown NFT Collection",
            ticker: nftInfo.contract_ticker_symbol || "",
            type: detectedType,
            image: nftInfo.nft_data?.[0]?.external_data?.image || nftInfo.logo_url,
            totalSupply,
            holders: uniqueHolders.size || holdersData?.data?.pagination?.total_count || 0,
            marketCap: floorPrice,
            createdAt: new Date().toISOString()
          };
        }
      }
    } else {
      // For ERC20 and remaining Custom contracts
      const tokenUrl = `https://api.covalenthq.com/v1/${chainName}/tokens/${normalizedAddress}/?key=${COVALENT_API_KEY}`;
      const tokenData = await fetchWithContentCheck(tokenUrl);
      console.log("Token Data:", tokenData);

      // Try to get balance data if token data fails
      const balanceUrl = `https://api.covalenthq.com/v1/${chainName}/address/${normalizedAddress}/balances_v2/?key=${COVALENT_API_KEY}`;
      const balanceData = await fetchWithContentCheck(balanceUrl);
      console.log("Balance Data:", balanceData);

      // Try to get token info from balances
      const balanceInfo = balanceData?.data?.items?.find(
        (item: any) => item.contract_address?.toLowerCase() === normalizedAddress.toLowerCase()
      );

      // Get contract info from any available source, prioritizing price data
      const info = priceTokenInfo || tokenData?.data?.items?.[0] || balanceInfo;
  
      // Even if we don't have token info, return basic contract data
      return {
        address: normalizedAddress,
        chainId: chainId,
        name: info?.contract_name || "Unknown Contract",
        ticker: info?.contract_ticker_symbol || "",
        type: detectedType,
        image: info?.logo_url || info?.logo_urls?.["256"] || null,
        totalSupply: info?.total_supply,
        holders: holdersCount,
        marketCap: latestPrice,
        createdAt: new Date().toISOString()
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching contract metadata:", error);
    return null;
  }
}

export async function* searchContractsStream(query: string): AsyncGenerator<SearchResult, void, unknown> {
  if (!isAddress(query)) {
    console.log("Not a valid address, skipping search");
    return;
  }

  const address = getAddress(query);
  const promises = SUPPORTED_CHAINS.map(async (chainId) => {
    try {
      const contractType = await getContractType(address, chainId);
      if (contractType === "Unknown") return null;

      const metadata = await getContractMetadata(address, chainId, contractType);
      if (!metadata) return null;

      return {
        address: address,
        chain: chainId,
        name: metadata.contract_name || "Unknown Contract",
        ticker: metadata.contract_ticker_symbol || "",
        type: contractType,
        image: metadata.logo_url || metadata.nft_data?.[0]?.external_data?.image,
        marketCap: metadata.quote_rate || metadata.floor_price_quote || 0,
        holders: metadata.total_supply || metadata.total_count
      };
    } catch (error) {
      console.error(`Error fetching data for chain ${chainId}:`, error);
      return null;
    }
  });

  // Create an array to track which promises are still pending
  const pending = promises.map((_, index) => index);
  
  while (pending.length > 0) {
    const result = await Promise.race(
      pending.map(async (index) => {
        const result = await promises[index];
        return { index, result };
      })
    );
    
    // Remove the completed promise from pending
    pending.splice(pending.indexOf(result.index), 1);
    
    if (result.result) {
      yield result.result;
    }
  }
}
