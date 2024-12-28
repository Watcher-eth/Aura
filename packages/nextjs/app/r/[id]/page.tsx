import { getContractInfo } from '../../../utils/getContractInfo';
import ReviewModal from '~~/components/modals/ReviewModal';
import ReviewPage from '~~/components/review';

interface Props {
  params: {
    id: string;
  };
}

export default async function Review({ params }: Props) {
  const addressInfo = await getContractInfo(params.id);

  if (!addressInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-[70px] font-bold">Address Not Found</h1>
        <p className="text-gray-600">This contract could not be found.</p>
      
      </div>
    );
  }

  return (
    <ReviewPage/>
  );
}

export async function generateMetadata({ params }: Props) {
  const addressInfo = await getContractInfo(params.id);
  return {
    address: params.id,
    title: addressInfo?.name || 'Review Address',
    description: `Review details for ${addressInfo?.address || 'unknown address'}`,
  };
}
