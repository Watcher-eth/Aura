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
}

async function getContractMetadata(address: string, chainId: number) {
  try {
    const sourcifyResponse = await fetch(
      `https://sourcify.dev/server/files/any/${chainId}/${address}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (sourcifyResponse.ok) {
      const metadata = await sourcifyResponse.json();
      return {
        contractType: detectContractType(metadata),
        verified: true
      };
    }

    return { verified: false };
  } catch {
    return { verified: false };
  }
}

function detectContractType(metadata: any) {
  const interfaces = metadata?.output?.abi || [];
  
  const hasERC20 = interfaces.some((i: any) => 
    ['transfer', 'transferFrom', 'approve', 'totalSupply'].every(fn => 
      interfaces.some((abi: any) => abi.name === fn)
    )
  );

  const hasERC721 = interfaces.some((i: any) =>
    ['safeTransferFrom', 'ownerOf', 'balanceOf'].every(fn =>
      interfaces.some((abi: any) => abi.name === fn)
    )
  );

  const hasERC1155 = interfaces.some((i: any) =>
    ['safeTransferFrom', 'balanceOf', 'safeBatchTransferFrom'].every(fn =>
      interfaces.some((abi: any) => abi.name === fn)
    )
  );

  if (hasERC20) return 'ERC20';
  if (hasERC721) return 'ERC721';
  if (hasERC1155) return 'ERC1155';
  return 'Unknown';
}

export async function getContractInfo(address: string): Promise<ContractInfo | null> {
  if (!address || address.length !== 42) {
    return null;
  }

  try {
    // Get basic info from Covalent with server-side caching
    const covalentResponse = await fetch(
      `https://api.covalenthq.com/v1/chains/all/addresses/${address}/balances_v2/`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.COVALENT_API_KEY}`
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    const covalentData = await covalentResponse.json();
    
    if (covalentData.error || !covalentData.data?.items?.length) {
      return null;
    }

    // Get the first chain where this contract exists
    const contractData = covalentData.data.items[0];
    
    // Get additional metadata
    const metadata = await getContractMetadata(address, contractData.chain_id);

    return {
      address: address,
      chainId: contractData.chain_id,
      chainName: contractData.chain_name,
      contractType: metadata.contractType,
      createdAt: contractData.first_transfer_timestamp || 'Unknown',
      name: contractData.contract_name,
      image: "https://via.placeholder.com/150", // You can replace with your image generation logic
      verified: metadata.verified
    };

  } catch (error) {
    console.error('Error fetching contract info:', error);
    return null;
  }
}
