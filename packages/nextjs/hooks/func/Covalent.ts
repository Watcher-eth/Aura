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
        const response = await fetch(url);
        if (!response.ok) {
          console.log(`Failed to fetch ${url}:`, response.status);
          return null;
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching:", url, error);
        return null;
      }
    };

    // Start with balances endpoint as it's most reliable
    const basicUrl = `https://api.covalenthq.com/v1/${chainName}/address/${address}/balances_v2/?key=${COVALENT_API_KEY}`;
    const basicData = await fetchJson(basicUrl);
    
    // Find this token in the balances
    const basicInfo = basicData?.data?.items?.find(
      (item: any) => item.contract_address?.toLowerCase() === address.toLowerCase()
    );

    // If we found the token in balances, we have good metadata
    if (basicInfo) {
      console.log("Found token in balances:", basicInfo);
      return {
        contract_name: basicInfo.contract_name,
        contract_ticker_symbol: basicInfo.contract_ticker_symbol,
        logo_url: basicInfo.logo_url,
        total_supply: basicInfo.total_supply,
        total_count: basicInfo.total_supply,
        quote_rate: basicInfo.quote_rate,
        floor_price_quote: null
      };
    }

    // Try the token endpoint next
    const tokenUrl = `https://api.covalenthq.com/v1/${chainName}/tokens/${address}/?key=${COVALENT_API_KEY}`;
    const tokenData = await fetchJson(tokenUrl);
    const tokenInfo = tokenData?.data?.items?.[0];

    if (tokenInfo) {
      console.log("Found token info:", tokenInfo);
      return {
        contract_name: tokenInfo.contract_name,
        contract_ticker_symbol: tokenInfo.contract_ticker_symbol,
        logo_url: tokenInfo.logo_url,
        total_supply: tokenInfo.total_supply,
        total_count: tokenInfo.total_supply,
        quote_rate: tokenInfo.quote_rate,
        floor_price_quote: null
      };
    }

    // If still no data, try the holders endpoint
    const holdersUrl = `https://api.covalenthq.com/v1/${chainName}/tokens/${address}/token_holders_v2/?key=${COVALENT_API_KEY}&page-size=1000`;
    const holdersData = await fetchJson(holdersUrl);
    const holdersCount = holdersData?.data?.pagination?.total_count || 0;

    // For NFTs, try to get additional metadata
    if ((contractType === "ERC721" || contractType === "ERC1155") && holdersCount > 0) {
      const nftUrl = `https://api.covalenthq.com/v1/${chainName}/tokens/${address}/nft_token_ids/?key=${COVALENT_API_KEY}`;
      const nftData = await fetchJson(nftUrl);
      
      if (nftData?.data?.items?.length > 0) {
        const nftInfo = nftData.data.items[0];
        return {
          contract_name: nftInfo.contract_name || "NFT Collection",
          contract_ticker_symbol: nftInfo.contract_ticker_symbol || "",
          logo_url: nftInfo.nft_data?.[0]?.external_data?.image || nftInfo.logo_url,
          total_supply: nftData.data.pagination.total_count,
          total_count: holdersCount,
          quote_rate: 0,
          floor_price_quote: null
        };
      }
    }

    // If we have holders data but no other info
    if (holdersCount > 0) {
      // Try to get price data
      const priceUrl = `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainName}/USD/${address}/?key=${COVALENT_API_KEY}`;
      const priceData = await fetchJson(priceUrl);
      const latestPrice = priceData?.data?.[0]?.items?.[0]?.price || 0;

      return {
        contract_name: `${contractType} Token`,
        contract_ticker_symbol: "",
        logo_url: null,
        total_supply: holdersCount,
        total_count: holdersCount,
        quote_rate: latestPrice,
        floor_price_quote: null
      };
    }

    return null;
  } catch (error) {
    console.error("Error in getContractMetadata:", error);
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
        image: metadata.logo_url || null,
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

export async function searchContracts(query: string): Promise<SearchResult[]> {
  if (!isAddress(query)) {
    console.log("Not a valid address, skipping search");
    return [];
  }

  const address = getAddress(query);
  const results: SearchResult[] = [];
  const pendingChains = [...SUPPORTED_CHAINS];

  // Process chains in parallel but collect results as they come in
  while (pendingChains.length > 0) {
    const chainPromises = pendingChains.map(async chainId => {
      try {
        const contractType = await getContractType(address, chainId);
        if (contractType === "Unknown") return { chainId, result: null };

        const metadata = await getContractMetadata(address, chainId, contractType);
        if (!metadata) return { chainId, result: null };

        const result = {
          address: address,
          chain: chainId,
          name: metadata.contract_name || "Unknown Contract",
          ticker: metadata.contract_ticker_symbol || "",
          type: contractType,
          image: metadata.logo_url || null,
          marketCap: metadata.quote_rate || metadata.floor_price_quote || 0,
          holders: metadata.total_supply || metadata.total_count
        };
        
        console.log("Chain", chainId, "result:", result);
        return { chainId, result };
      } catch (error) {
        console.error(`Error fetching data for chain ${chainId}:`, error);
        return { chainId, result: null };
      }
    });

    try {
      // Wait for any chain to complete
      const responses = await Promise.all(chainPromises);
      
      // Process all successful responses
      for (const { chainId, result } of responses) {
        // Remove this chain from pending
        const index = pendingChains.indexOf(chainId);
        if (index > -1) {
          pendingChains.splice(index, 1);
        }

        // Add valid result to results array
        if (result) {
          console.log("Adding result from chain", chainId, ":", result);
          results.push(result);
        }
      }
    } catch (error) {
      console.error("Error processing chain results:", error);
    }
  }

  console.log("Final results:", results);
  return results;
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

      // Get contract info from any available source
      const info = tokenData?.data?.items?.[0] || balanceInfo;
  
      // Even if we don't have token info, return basic contract data
      return {
        address: normalizedAddress,
        chainId: chainId,
        name: info?.contract_name || "Unknown Contract",
        ticker: info?.contract_ticker_symbol || "",
        type: detectedType,
        image: info?.logo_url || null,
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
