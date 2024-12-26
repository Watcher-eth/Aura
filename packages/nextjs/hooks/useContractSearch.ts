import { useState, useEffect } from 'react';

interface ContractInfo {
  address: string;
  chainId: number;
  chainName: string;
  contractType?: string;  // ERC20, ERC721, ERC1155, etc.
  createdAt: string;
  name?: string;
  image?: string;  // Logo or identicon
  implementation?: string; // For proxy contracts
  verified: boolean;
}

async function getContractMetadata(address: string, chainId: number) {
  try {
    // Get contract metadata from Sourcify
    const sourcifyResponse = await fetch(
      `https://sourcify.dev/server/files/any/${chainId}/${address}`
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
  
  // Check for standard interfaces
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

function generateBlockieImage(address: string): string {
  // Use either blockies or jazzicon library to generate identicon
  // For now, returning a placeholder
  return "https://via.placeholder.com/150";
}

export function useContractSearch(searchAddress: string) {
  const [results, setResults] = useState<ContractInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchContracts = async () => {
      if (!searchAddress || searchAddress.length !== 42) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get basic info from Covalent
        const covalentResponse = await fetch(
          `https://api.covalenthq.com/v1/chains/all/addresses/${searchAddress}/balances_v2/`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`
            }
          }
        );

        const covalentData = await covalentResponse.json();
        
        if (covalentData.error) {
          throw new Error(covalentData.error_message);
        }

        // Process each chain result
        const contractPromises = covalentData.data.items.map(async (item: any) => {
          // Get additional metadata
          const metadata = await getContractMetadata(searchAddress, item.chain_id);
          
          return {
            address: searchAddress,
            chainId: item.chain_id,
            chainName: item.chain_name,
            contractType: metadata.contractType,
            createdAt: item.first_transfer_timestamp || 'Unknown',
            name: item.contract_name,
            image: generateBlockieImage(searchAddress),
            verified: metadata.verified
          };
        });

        const contracts = await Promise.all(contractPromises);
        setResults(contracts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while searching');
      } finally {
        setLoading(false);
      }
    };

    searchContracts();
  }, [searchAddress]);

  return { results, loading, error };
}
