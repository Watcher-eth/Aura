import { getContractInfo } from '../../../../utils/getContractInfo';
import ReviewModal from '~~/components/modals/ReviewModal';
import ReviewPage from '~~/components/review';
import { notFound } from 'next/navigation';
import { fetchContractMetadata, SUPPORTED_CHAINS } from '~~/hooks/func/Covalent';

interface Props {
  params: {
    chainId: string;
    address: string;
  };
}

export default async function Review({ params }: Props) {
  // Validate chainId
  const chainId = parseInt(params.chainId);
  if (!SUPPORTED_CHAINS.includes(chainId)) {
    notFound();
  }

  // Validate address format
  if (!params.address || !/^0x[a-fA-F0-9]{40}$/.test(params.address)) {
    notFound();
  }

  const addressInfo = await fetchContractMetadata(params.address, chainId);

  if (!addressInfo) {
    notFound();
  }

  return (
    <ReviewPage 
      contractInfo={addressInfo}
    />
  );
}

export async function generateMetadata({ params }: Props) {
  // Validate chainId
  const chainId = parseInt(params.chainId);
  if (!SUPPORTED_CHAINS.includes(chainId)) {
    return {
      title: 'Invalid Chain',
      description: 'The provided chain ID is not supported',
    };
  }

  // Validate address format
  if (!params.address || !/^0x[a-fA-F0-9]{40}$/.test(params.address)) {
    return {
      title: 'Invalid Address',
      description: 'The provided address is invalid',
    };
  }

  const addressInfo = await fetchContractMetadata(params.address, chainId);

  if (!addressInfo) {
    return {
      title: 'Contract Not Found',
      description: 'The requested contract could not be found',
    };
  }

  return {
    title: `${addressInfo.name || 'Contract'} (${addressInfo.contractType || 'Unknown'})`,
    description: `Review details for ${addressInfo.name || addressInfo.address} on ${addressInfo.chainName}`,
  };
}
