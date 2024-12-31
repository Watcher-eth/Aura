interface ContractInfo {
  address: string;
  chainId: number;
  chainName: string;
  contractType?: string;
  createdAt: string;
  name?: string;
  image?: string;
  implementation?: string;
  verified: boolean;
  abi?: any;
  tokenInfo?: {
    totalSupply?: string;
    holders?: number;
    decimals?: number;
    symbol?: string;
  };
}

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const CHAIN_ENDPOINTS = {
  1: {
    name: 'Ethereum',
    endpoint: 'https://api.etherscan.io/api',
  },
  // Add more chains as needed
};

async function getContractABI(address: string, chainId: number): Promise<{ abi: any; verified: boolean }> {
  try {
    const endpoint = CHAIN_ENDPOINTS[chainId as keyof typeof CHAIN_ENDPOINTS]?.endpoint;
    if (!endpoint) {
      return { abi: null, verified: false };
    }

    const response = await fetch(
      `${endpoint}?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();
    if (data.status === '1' && data.result) {
      return { 
        abi: JSON.parse(data.result),
        verified: true
      };
    }

    return { abi: null, verified: false };
  } catch {
    return { abi: null, verified: false };
  }
}

async function getTokenInfo(address: string, chainId: number, contractType: string): Promise<any> {
  try {
    const endpoint = CHAIN_ENDPOINTS[chainId as keyof typeof CHAIN_ENDPOINTS]?.endpoint;
    if (!endpoint) return null;

    // Get token transactions to determine info
    const txResponse = await fetch(
      `${endpoint}?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const txData = await txResponse.json();
    if (txData.status !== '1' || !txData.result?.length) {
      return null;
    }

    // Get holder count
    const holdersResponse = await fetch(
      `${endpoint}?module=token&action=tokenholderlist&contractaddress=${address}&apikey=${ETHERSCAN_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    
    const holdersData = await holdersResponse.json();
    const holders = holdersData.status === '1' ? holdersData.result.length : 0;

    // Extract token info from first transaction
    const firstTx = txData.result[0];
    return {
      symbol: firstTx.tokenSymbol,
      name: firstTx.tokenName,
      decimals: parseInt(firstTx.tokenDecimal),
      totalSupply: firstTx.value, // This is just from first tx, not actual total supply
      holders,
    };
  } catch (error) {
    console.error('Error fetching token info:', error);
    return null;
  }
}

function detectContractType(abi: any) {
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
  try {
    const endpoint = CHAIN_ENDPOINTS[chainId as keyof typeof CHAIN_ENDPOINTS]?.endpoint;
    if (!endpoint) return null;

    const response = await fetch(
      `${endpoint}?module=contract&action=getcontractcreation&contractaddresses=${address}&apikey=${ETHERSCAN_API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();
    if (data.status === '1' && data.result?.[0]?.txHash) {
      const txResponse = await fetch(
        `${endpoint}?module=proxy&action=eth_getTransactionByHash&txhash=${data.result[0].txHash}&apikey=${ETHERSCAN_API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      const txData = await txResponse.json();
      if (txData.result?.blockNumber) {
        const timestamp = parseInt(txData.result.blockNumber, 16).toString();
        return new Date(parseInt(timestamp) * 1000).toISOString();
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function getContractInfo(address: string): Promise<ContractInfo | null> {
  try {
    // For now, we'll default to Ethereum mainnet
    const chainId = 1;
    const chainName = CHAIN_ENDPOINTS[chainId]?.name || 'Unknown Chain';

    // Get contract ABI and verify status
    const { abi, verified } = await getContractABI(address, chainId);
    
    // Detect contract type from ABI
    const contractType = detectContractType(abi);

    // Get contract creation date
    const createdAt = await getContractCreation(address, chainId) || new Date().toISOString();

    // Get token-specific info if it's a token contract
    let tokenInfo = null;
    if (contractType && ['ERC20', 'ERC721', 'ERC1155'].includes(contractType)) {
      tokenInfo = await getTokenInfo(address, chainId, contractType);
    }

    // Get contract name from ABI if available, or from token info
    const name = tokenInfo?.name || 
                 abi?.find((item: any) => item.type === 'constructor')?.name || 
                 'Unknown Contract';

    return {
      address,
      chainId,
      chainName,
      contractType,
      createdAt,
      name,
      verified,
      abi,
      tokenInfo,
      image: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`,
    };
  } catch (error) {
    console.error('Error fetching contract info:', error);
    return null;
  }
}
