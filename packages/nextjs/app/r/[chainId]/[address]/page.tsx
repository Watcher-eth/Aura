import { getAddress } from "viem";
import { notFound } from 'next/navigation';
import { SUPPORTED_CHAINS, fetchContractMetadata } from '~~/hooks/func/Covalent';
import ReviewPage from '~~/components/review';
import { getReviewsForAddress } from "~~/hooks/graphql/useGetReviewsForAddress";

interface Props {
  params: {
    chainId: string;
    address: string;
  };
}

export default async function Review({ params }: Props) {
  const chainId = parseInt(params.chainId);

  if (!SUPPORTED_CHAINS.includes(chainId)) {
    notFound();
  }

  const address = getAddress(params.address);
  const contractInfo = await fetchContractMetadata(address, chainId);


  console.log("Contract Info:",address, contractInfo);
  if (!contractInfo) {
    notFound();
  }

  // Empty reviews array for now
  const reviews = await getReviewsForAddress(address)

  return (
    <ReviewPage 
      contractInfo={contractInfo}
      reviews={reviews}
    />
  );
}
