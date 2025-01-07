
// @ts-nocheck
import ReviewModal from '~~/components/modals/ReviewModal';

interface Props {
  params: {
    id: string;
    name: string;
  };
}

export default async function ReviewPage({ params }: Props) {

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-[70px] font-bold">Address Not Found</h1>
        <p className="text-gray-600">This contract could not be found.</p>
        <div className="flex justify-end mt-4">
          <ReviewModal 
            name={params.name}
            address={params.id}
            trigger={
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">
                Give Feedback
              </button>
            }
          />
        </div>
      </div>
    );
  

  
}

export async function generateMetadata({ params }: Props) {
  return {
    address: params.id,
  };
}
