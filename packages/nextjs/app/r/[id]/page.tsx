import { getContractInfo } from '../../../utils/getContractInfo';
import ReviewModal from '~~/components/modals/ReviewModal';
import ReviewPage from '~~/components/review';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function Review({ params }: Props) {
  // Validate address format
  if (!params.id || !/^0x[a-fA-F0-9]{40}$/.test(params.id)) {
    notFound();
  }

  const addressInfo = await getContractInfo(params.id);

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
  if (!params.id || !/^0x[a-fA-F0-9]{40}$/.test(params.id)) {
    return {
      title: 'Invalid Address',
      description: 'The provided address is invalid',
    };
  }

  const addressInfo = await getContractInfo(params.id);

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
