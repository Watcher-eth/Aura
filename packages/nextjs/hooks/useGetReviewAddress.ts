import { useQuery } from '@tanstack/react-query';
import { getContractInfo } from '../utils/getContractInfo';

export interface ReviewAddressInfo {
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

export function useGetReviewAddress(id: string) {
  return useQuery<ReviewAddressInfo | null>({
    queryKey: ['review-address', id],
    queryFn: async () => {
      if (!id) return null;
      return getContractInfo(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
