// @ts-nocheck

import { debounce } from 'lodash';

export interface SearchResult {
  chainId: number;
  address: string;
  name?: string;
  symbol?: string;
  type?: string;
  imageUrl?: string;
  verified?: boolean;
  decimals?: string;
}

const CHAIN_NAMES: { [key: number]: string } = {
  1: "Ethereum",
  56: "BSC",
  137: "Polygon",
  42161: "Arbitrum",
  10: "Optimism",
};

const SUPPORTED_CHAINS = [1, 56, 137, 42161, 10];

async function getTokenInfo(address: string, chainId: number, apiKey: string): Promise<SearchResult | null> {
  const baseUrls: { [key: number]: string } = {
    1: "https://api.etherscan.io/v2/api",
    56: "https://api.bscscan.com/v2/api",
    137: "https://api.polygonscan.com/v2/api",
    42161: "https://api.arbiscan.io/v2/api",
    10: "https://api-optimistic.etherscan.io/v2/api",
  };

  const baseExplorerUrls: { [key: number]: string } = {
    1: "https://etherscan.io",
    56: "https://bscscan.com",
    137: "https://polygonscan.com",
    42161: "https://arbiscan.io",
    10: "https://optimistic.etherscan.io",
  };

  const url = baseUrls[chainId];
  if (!url) return null;

  try {
    // First get contract source code to determine type
    const sourceParams = new URLSearchParams({
      apikey: apiKey,
      chainid: chainId.toString(),
      module: "contract",
      action: "getsourcecode",
      address: address,
    });

    const sourceResponse = await fetch(`${url}?${sourceParams.toString()}`);
    const sourceData = await sourceResponse.json();
    console.log("Source data:", sourceData);

    if (sourceData.status === "1" && sourceData.result?.[0]) {
      const contractInfo = sourceData.result[0];
      const sourceCode = contractInfo.SourceCode || "";
      const contractName = contractInfo.ContractName || "";
      
      console.log("Contract info:", {
        name: contractName,
        sourceCodeLength: sourceCode.length,
      });

      // Detect token type
      const isERC20 = sourceCode.includes("function transfer") || 
                     sourceCode.includes("function balanceOf") ||
                     sourceCode.includes("ERC20") || 
                     sourceCode.includes("IERC20");

      const isERC721 = sourceCode.includes("function tokenURI") ||
                      sourceCode.includes("ERC721") ||
                      sourceCode.includes("IERC721");

      const isERC1155 = sourceCode.includes("function uri") ||
                       sourceCode.includes("ERC1155") ||
                       sourceCode.includes("IERC1155");

      const isToken = isERC20 || isERC721 || isERC1155;

      if (isToken) {
        console.log("Detected as token type:", { isERC20, isERC721, isERC1155 });
        
        // Try getting token info from transaction history based on type
        let txParams: URLSearchParams;
        
        if (isERC1155) {
          txParams = new URLSearchParams({
            apikey: apiKey,
            chainid: chainId.toString(),
            module: "account",
            action: "token1155tx",
            contractaddress: address,
            page: "1",
            offset: "1",
          });
        } else if (isERC721) {
          txParams = new URLSearchParams({
            apikey: apiKey,
            chainid: chainId.toString(),
            module: "account",
            action: "tokennfttx",
            contractaddress: address,
            page: "1",
            offset: "1",
          });
        } else {
          txParams = new URLSearchParams({
            apikey: apiKey,
            chainid: chainId.toString(),
            module: "account",
            action: "tokentx",
            contractaddress: address,
            page: "1",
            offset: "1",
          });
        }

        const txResponse = await fetch(`${url}?${txParams.toString()}`);
        const txData = await txResponse.json();
        console.log("Transaction data:", txData);

        if (txData.status === "1" && txData.result?.[0]) {
          const tokenTx = txData.result[0];
          let tokenType = "ERC20";
          if (isERC721) tokenType = "ERC721";
          if (isERC1155) tokenType = "ERC1155";

          return {
            chainId,
            address,
            name: tokenTx.tokenName || contractName || "Unknown Token",
            symbol: tokenTx.tokenSymbol,
            type: tokenType,
            imageUrl: `${baseExplorerUrls[chainId]}/token/images/${address}`,
            verified: true,
            decimals: tokenTx.tokenDecimal,
          };
        }
      }

      // If not a token or token info not found, return contract info
      return {
        chainId,
        address,
        name: contractInfo.ContractName || "Unknown Contract",
        type: "Contract",
        verified: contractInfo.CompilerVersion ? true : false,
      };
    }
  } catch (error) {
    console.error(`Error fetching token info for ${address} on chain ${chainId}:`, error);
  }

  return null;
}

async function searchChain(query: string, chainId: number): Promise<SearchResult[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    if (!apiKey) {
      console.error("Etherscan API key not found");
      return [];
    }

    const baseUrls: { [key: number]: string } = {
      1: "https://api.etherscan.io/v2/api",
      56: "https://api.bscscan.com/v2/api",
      137: "https://api.polygonscan.com/v2/api",
      42161: "https://api.arbiscan.io/v2/api",
      10: "https://api-optimistic.etherscan.io/v2/api",
    };

    const url = baseUrls[chainId];
    if (!url) return [];

    // Determine if the query is an address
    const isAddress = /^0x[a-fA-F0-9]{40}$/.test(query);
    
    if (isAddress) {
      // Try getting token/contract info
      const tokenInfo = await getTokenInfo(query, chainId, apiKey);
      if (tokenInfo) {
        return [tokenInfo];
      }
    } else {
      // Search for contracts
      const params = new URLSearchParams({
        apikey: apiKey,
        chainid: chainId.toString(),
        module: "contract",
        action: "getsourcecode",
        address: query,
      });

      const response = await fetch(`${url}?${params.toString()}`);
      const data = await response.json();

      if (data.status === "1" && Array.isArray(data.result)) {
        // Get detailed info for each contract found
        const contractPromises = data.result
          .slice(0, 5) // Limit to first 5 results to avoid rate limiting
          .map((result): SearchResult => getTokenInfo(result.address, chainId, apiKey));

        const contracts = await Promise.all(contractPromises);
        console.log(contracts)
        return contracts.filter((contract): contract is SearchResult => contract !== null);
      }
    }

    return [];
  } catch (error) {
    console.error(`Error searching chain ${chainId}:`, error);
    return [];
  }
}

export const searchContracts = debounce(async (
  query: string,
  callback: (results: SearchResult[]) => void
) => {
  if (!query || query.length < 2) {
    callback([]);
    return;
  }

  try {
    // Search all supported chains in parallel
    const searchPromises = SUPPORTED_CHAINS.map(chainId => searchChain(query, chainId));
    const results = await Promise.all(searchPromises);
    
    // Flatten and sort results
    const flattenedResults = results.flat().sort((a, b) => {
      // Prioritize verified contracts
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;
      
      // Then exact matches
      const queryLower = query.toLowerCase();
      const aNameMatch = a.name?.toLowerCase() === queryLower;
      const bNameMatch = b.name?.toLowerCase() === queryLower;
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // Then by name similarity
      const aStartsWith = a.name?.toLowerCase().startsWith(queryLower);
      const bStartsWith = b.name?.toLowerCase().startsWith(queryLower);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      return 0;
    });

    callback(flattenedResults);
  } catch (error) {
    console.error('Error searching contracts:', error);
    callback([]);
  }
}, 300);
