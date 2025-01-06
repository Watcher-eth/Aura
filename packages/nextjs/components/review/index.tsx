import React, { useState } from 'react';
import ReviewHeader from './ReviewHeader';
import StatsOverview from './StatsOverview';
import { Review } from '~~/__generated__/graphql';
import UserReview from './UserReview';
import ReviewModal from '../modals/ReviewModal';
import { UserReviewPlaceholder } from './UserReviewPlaceholder';
import DynamicMiddle from './DynamicMiddle';

interface ContractInfo {
  address: string;
  chainId: number;
  name: string;
  ticker?: string;
  type?: string;
  image?: string;
  marketCap?: number;
  holders?: number;
  createdAt: string;
}

interface Props {
  contractInfo: ContractInfo;
  reviews: Review[]
}

function ReviewPage({ contractInfo, reviews }: Props) {
  console.log("Contract Info in Review Page:", contractInfo);
  
  const stats ={}
  const averageRating = reviews?.length > 0
    ? reviews?.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  console.log("Contrac:", contractInfo);
  return (
    <div className="container px-0 pt-[6rem]">
      <ReviewHeader
        name={contractInfo.name || 'Unknown Contract'}
        address={contractInfo.address}
        rating={averageRating}
        chainId={contractInfo.chainId}
        image={contractInfo.image}
        ticker={contractInfo.ticker}
        createdAt={contractInfo.createdAt}
        type={contractInfo.type!}
      />
    <DynamicMiddle
    
      contractInfo={contractInfo}
        images={[contractInfo.image || 'https://via.placeholder.com/150']}
      />

      <StatsOverview
        address={contractInfo.address}
        totalReviews={reviews?.length}
        averageRating={averageRating}
        holders={contractInfo.holders}
        contractInfo={contractInfo}
        marketCap={contractInfo.marketCap}
        emojiStats={stats?.emojiStats}
      />

<div className="w-full space-y-6 mt-8 items-center">
        {reviews?.length > 0 ? reviews.map((review) => (
          <UserReview
            key={review.id}
            {...review}
          />
        )) : <div className='flex flex-col w-full items-center'>{[0,].map((index) => (<UserReviewPlaceholder key={index}/>))}</div>}
        <div className='h-[40vh] w-full absolute bottom-0 z-[1] bg-gradient-to-t from-white to-transparent'/>
        <div className="relative z-[2] flex flex-col items-center">
          <h1 className="text-[50px] font-bold -mt-[4rem]">No Reviews yet..</h1>
          <p className="text-gray-600 mt-2 text-lg">Be the first to review this contract</p>
          <div className="flex justify-end mt-4 mb-20">
            <ReviewModal
              name={contractInfo.name ?? contractInfo.address}
              trigger={
                <button className='px-4 py-1.5 rounded-md border-2 border-[#ededed] bg-[white]'>
                  Write a Review
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Example usage with mock data:
export const mockReviewPage = {
  contractInfo: {
    name: "Ethereum",
    address: "0x1234567890",
    chainId: 1,
    image: "https://example.com/ethereum-logo.png",
    marketCap: 100000000,
    holders: 10000,
    createdAt: "2022-01-01T00:00:00.000Z",
  },
  reviews: [
    {
      id: "review1",
      profilePicture: "https://example.com/user1.jpg",
      name: "Alice",
      rating: 5,
      reviewText: "Amazing project with great potential! The team is very responsive and the community is fantastic.",
      reactions: [
        { emoji: "👍", count: 24, selected: false },
        { emoji: "❤️", count: 12, selected: false },
        { emoji: "🔥", count: 8, selected: false },
      ],
    },
    {
      id: "review2",
      profilePicture: "https://example.com/user2.jpg",
      name: "Bob",
      rating: 4,
      reviewText: "Solid fundamentals and great execution. Looking forward to future developments.",
      reactions: [
        { emoji: "👍", count: 18, selected: false },
        { emoji: "🚀", count: 15, selected: false },
        { emoji: "💡", count: 7, selected: false },
      ],
    },
  ],
};

export default ReviewPage;