'use client';

import { useQuery } from '@tanstack/react-query';
import { getCovalentChainName } from './func/Covalent';

interface PriceData {
  date: string;
  price: number;
}

interface CovalentPriceResponse {
  data: Array<{
    contract_address: string;
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    items: Array<{
      date: string;
      price: number;
      pretty_price: string;
    }>;
  }>;
}

async function fetchPriceData(address: string, chainId: number): Promise<PriceData[]> {
  if (!address || !chainId) {
    return [];
  }

  const chainName = getCovalentChainName(chainId);
  const url = `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainName}/USD/${address}/`;
  
  // Get dates for the last 30 days
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const toDate = today.toISOString().split('T')[0];
  const fromDate = thirtyDaysAgo.toISOString().split('T')[0];

  const params = new URLSearchParams({
    'from': fromDate,
    'to': toDate,
    'prices-at-asc': 'true'
  });
  
  const fullUrl = `${url}?${params}&key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`;
  console.log('Fetching price data from:', fullUrl);
  
  const response = await fetch(fullUrl);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', errorText);
    throw new Error(`Failed to fetch price data: ${response.status}`);
  }

  const jsonData = await response.json();
  console.log('Raw API Response:', jsonData);

  // Check if we have valid data
  if (!jsonData.data?.[0]?.items) {
    console.error('No items in response:', jsonData);
    throw new Error('No price data available');
  }

  // Transform the data for the chart
  const prices = jsonData.data[0].items.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric'
    }),
    price: Number(item.price)
  }))

  console.log('Transformed prices:', prices);

  if (prices.length === 0) {
    throw new Error('No valid price data available');
  }

  return prices;
}

export function useTokenPrice(address: string, chainId: number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['tokenPrice', address, chainId],
    queryFn: () => fetchPriceData(address, chainId),
    enabled: Boolean(address && chainId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  return {
    priceData: data || [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
