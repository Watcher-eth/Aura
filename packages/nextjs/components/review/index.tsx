import React from 'react';
import ReviewHeader from './ReviewHeader';
import DynamicMiddle from './DynamicMiddle';
import StatsOverview from './StatsOverview';
import UserReview from './UserReview';
import { type review } from "~~/lib/types/generated/schema.graphql";
import { type ContractInfo } from '~~/utils/getContractInfo';

interface ReviewPageProps {
  contractInfo: ContractInfo;
  reviews?: Array<{
    id: string;
    profilePicture?: string;
    name: string;
    rating: number;
    reviewText: string;
    reactions: Array<{
      emoji: string;
      count: number;
      selected: boolean;
    }>;
  }>;
}

function ReviewPage({
  contractInfo,
  reviews = [],
}: ReviewPageProps) {
  console.log("contractInfo", contractInfo);
  
  const stats = {
    totalReviews: reviews.length,
    holders: contractInfo.tokenInfo?.holders || 0,
    marketCap: contractInfo.tokenInfo?.totalSupply 
      ? `${parseInt(contractInfo.tokenInfo.totalSupply).toLocaleString()} ${contractInfo.tokenInfo.symbol || ''}`
      : "N/A",
    emojiStats: reviews.reduce((acc, review) => {
      review.reactions.forEach(reaction => {
        const existing = acc.find(stat => stat.emoji === reaction.emoji);
        if (existing) {
          existing.count += reaction.count;
        } else {
          acc.push({ emoji: reaction.emoji, count: reaction.count });
        }
      });
      return acc;
    }, [] as Array<{ emoji: string; count: number }>),
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 pt-20 max-w-6xl">
      <ReviewHeader
        name={contractInfo.name || 'Unknown Contract'}
        username={contractInfo.address}
        rating={averageRating}
        numberOfRatings={reviews.length}
        contractType={contractInfo.contractType}
        chainName={contractInfo.chainName}
        verified={contractInfo.verified}
        symbol={contractInfo.tokenInfo?.symbol}
      />
      
      <DynamicMiddle
        images={[contractInfo.image || 'https://via.placeholder.com/150']}
      />

      <StatsOverview
        totalReviews={stats.totalReviews}
        holders={stats.holders}
        marketCap={stats.marketCap}
        emojiStats={stats.emojiStats}
      />

      <div className="mt-8 space-y-6">
        {reviews.map((review) => (
          <UserReview
            key={review.id}
            {...review}
          />
        ))}
      </div>
    </div>
  );
}

// Example usage with mock data:
export const mockReviewPage = {
  contractInfo: {
    name: "Ethereum",
    address: "0x1234567890",
    contractType: "ERC20",
    chainName: "Ethereum Mainnet",
    verified: true,
    image: "https://example.com/ethereum-logo.png",
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