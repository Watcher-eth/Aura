import { useState, useEffect } from 'react';

interface ChainConfig {
  name: string;
  scanApiUrl: string;
  apiKey: string;
}

const CHAIN_CONFIGS: ChainConfig[] = [
  {
    name: 'Ethereum',
    scanApiUrl: 'https://api.etherscan.io/api',
    apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || '',
  },
  {
    name: 'Polygon',
    scanApiUrl: 'https://api.polygonscan.com/api',
    apiKey: process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY || '',
  },
  {
    name: 'BSC',
    scanApiUrl: 'https://api.bscscan.com/api',
    apiKey: process.env.NEXT_PUBLIC_BSCSCAN_API_KEY || '',
  },
  // Add more chains as needed
];

interface AddressMatch {
  chain: string;
  address: string;
  isContract: boolean;
  contractName?: string;
  timestamp?: string;
}

export function useEvmSearch(searchAddress: string) {
  const [results, setResults] = useState<AddressMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchChains = async () => {
      if (!searchAddress || searchAddress.length !== 42) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);
      const matches: AddressMatch[] = [];

      try {
        await Promise.all(
          CHAIN_CONFIGS.map(async (chain) => {
            if (!chain.apiKey) return;

            // Check if address exists and if it's a contract
            const response = await fetch(
              `${chain.scanApiUrl}?module=contract&action=getabi&address=${searchAddress}&apikey=${chain.apiKey}`
            );
            const data = await response.json();

            if (data.status === '1') {
              // It's a contract
              const contractResponse = await fetch(
                `${chain.scanApiUrl}?module=contract&action=getsourcecode&address=${searchAddress}&apikey=${chain.apiKey}`
              );
              const contractData = await contractResponse.json();

              matches.push({
                chain: chain.name,
                address: searchAddress,
                isContract: true,
                contractName: contractData.result[0]?.ContractName || 'Unknown Contract',
                timestamp: contractData.result[0]?.Implementation || undefined,
              });
            } else {
              // Check if it's a regular address with transactions
              const txResponse = await fetch(
                `${chain.scanApiUrl}?module=account&action=txlist&address=${searchAddress}&startblock=0&endblock=99999999&page=1&offset=1&sort=desc&apikey=${chain.apiKey}`
              );
              const txData = await txResponse.json();

              if (txData.status === '1') {
                matches.push({
                  chain: chain.name,
                  address: searchAddress,
                  isContract: false,
                  timestamp: txData.result[0]?.timeStamp,
                });
              }
            }
          })
        );

        setResults(matches);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while searching');
      } finally {
        setLoading(false);
      }
    };

    searchChains();
  }, [searchAddress]);

  return { results, loading, error };
}
