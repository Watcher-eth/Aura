import { useState, useEffect } from 'react';

interface ChainBalance {
  chain_name: string;
  chain_id: number;
  balance: string;
  contract_address?: string;
  contract_name?: string;
  last_transfer?: string;
}

export function useCovalentSearch(address: string) {
  const [results, setResults] = useState<ChainBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchAddress = async () => {
      if (!address || address.length !== 42) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get balances across all chains
        const response = await fetch(
          `https://api.covalenthq.com/v1/chains/all/addresses/${address}/balances_v2/`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`
            }
          }
        );

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error_message);
        }

        // Transform the data
        const balances = data.data.items.map((item: any) => ({
          chain_name: item.chain_name,
          chain_id: item.chain_id,
          balance: item.balance,
          contract_address: item.contract_address,
          contract_name: item.contract_name,
          last_transfer: item.last_transfer_timestamp
        }));

        setResults(balances);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while searching');
      } finally {
        setLoading(false);
      }
    };

    searchAddress();
  }, [address]);

  return { results, loading, error };
}
