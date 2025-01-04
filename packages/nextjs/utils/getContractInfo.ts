import { fetchContractMetadata, SUPPORTED_CHAINS } from "~~/hooks/func/Covalent";
import { Address } from "viem";

interface ContractInfo {
  address: string;
  chainId: number;
  chainName: string;
  contractType?: string;
  createdAt: string;
  name?: string;
  ticker?: string;
  image?: string;
  holders?: number;
  marketCap?: number;
}

const CHAIN_NAMES: { [key: number]: string } = {
  1: "Ethereum",
  137: "Polygon",
  42161: "Arbitrum",
  10: "Optimism",
  8453: "Base",
  56: "BSC",
  324: "zkSync Era",
  37111: "Lens Testnet",
};

async function getContractABI(address: string, chainId: number): Promise<{ abi: any; verified: boolean }> {
  // This function is not used in the new implementation, but it's left here for reference
  try {
    const endpoint = `https://api.covalenthq.com/v1/${chainId}/address/${address}/metadata/`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.data.items) {
      return { abi: data.data.items[0].external_data.abi, verified: true };
    }
    return { abi: null, verified: false };
  } catch {
    return { abi: null, verified: false };
  }
}

async function getTokenInfo(address: string, chainId: number, contractType: string): Promise<any> {
  // This function is not used in the new implementation, but it's left here for reference
  try {
    const endpoint = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.data.items) {
      return {
        symbol: data.data.items[0].contract_name,
        name: data.data.items[0].contract_name,
        decimals: data.data.items[0].contract_decimals,
        totalSupply: data.data.items[0].total_supply,
        holders: data.data.items[0].num_holders,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching token info:', error);
    return null;
  }
}

function detectContractType(abi: any) {
  // This function is not used in the new implementation, but it's left here for reference
  if (!abi) return undefined;
  
  const hasERC20 = abi.some((i: any) => 
    ['transfer', 'transferFrom', 'approve', 'totalSupply'].every(fn => 
      abi.some((item: any) => item.name === fn)
    )
  );

  const hasERC721 = abi.some((i: any) =>
    ['safeTransferFrom', 'ownerOf', 'balanceOf'].every(fn =>
      abi.some((item: any) => item.name === fn && 
        (fn !== 'balanceOf' || item.inputs[0].type === 'address'))
    )
  );

  const hasERC1155 = abi.some((i: any) =>
    ['safeTransferFrom', 'balanceOf', 'safeBatchTransferFrom'].every(fn =>
      abi.some((item: any) => item.name === fn)
    )
  );

  if (hasERC20) return 'ERC20';
  if (hasERC721) return 'ERC721';
  if (hasERC1155) return 'ERC1155';
  return 'Contract';
}

async function getContractCreation(address: string, chainId: number): Promise<string | null> {
  // This function is not used in the new implementation, but it's left here for reference
  try {
    const endpoint = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&no-logs=false`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.data.items) {
      const txHash = data.data.items[0].tx_hash;
      const txResponse = await fetch(`https://api.covalenthq.com/v1/${chainId}/transaction_v2/${txHash}/?quote-currency=USD&format=JSON`);
      const txData = await txResponse.json();
      if (txData.data.items) {
        const timestamp = txData.data.items[0].block_signed_at;
        return new Date(timestamp).toISOString();
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function getContractInfo(address: string, chainId?: number): Promise<ContractInfo | null> {
  try {
    // If chainId is provided, only fetch for that chain
    const results = await fetchContractMetadata(address as Address, chainId);
    
    if (!results || results.length === 0) {
      return null;
    }

    // Get the first result that has data
    const contractData = results[0];
    
    return {
      address: contractData.address,
      chainId: contractData.chain,
      chainName: CHAIN_NAMES[contractData.chain] || `Chain ${contractData.chain}`,
      contractType: contractData.type,
      name: contractData.name,
      ticker: contractData.ticker,
      image: contractData.image,
      createdAt: contractData.createdAt || new Date().toISOString(),
      holders: typeof contractData.holders === 'number' ? contractData.holders : undefined,
      marketCap: typeof contractData.marketCap === 'number' ? contractData.marketCap : undefined,
    };
  } catch (error) {
    console.error('Error fetching contract info:', error);
    return null;
  }
}

export type { ContractInfo };
