import { getContractInfo } from '../../../utils/getContractInfo';

interface Props {
  params: {
    id: string;
  };
}

export default async function ReviewPage({ params }: Props) {
  const addressInfo = await getContractInfo(params.id);

  if (!addressInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-[70px] font-bold">Address Not Found</h1>
        <p className="text-gray-600">This contract could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <img 
            src={addressInfo.image || "https://via.placeholder.com/150"} 
            alt="Contract" 
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{addressInfo.name || 'Unknown Contract'}</h1>
            <p className="text-gray-600">{addressInfo.address}</p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold">Chain Info</h2>
            <p>{addressInfo.chainName} (ID: {addressInfo.chainId})</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold">Contract Type</h2>
            <p>{addressInfo.contractType || 'Unknown'}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold">Created At</h2>
            <p>{new Date(addressInfo.createdAt).toLocaleString()}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold">Verification Status</h2>
            <p>{addressInfo.verified ? 'Verified ✓' : 'Unverified'}</p>
          </div>
        </div>
      </div>
    </div>
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
