import React from 'react';
import ReviewHeader from './ReviewHeader';
import DynamicMiddle from './DynamicMiddle';
import StatsOverview from './StatsOverview';
import UserReview from './UserReview';
import { type review } from "~~/lib/types/generated/schema.graphql";

interface ReviewPageProps extends Partial<review> {
  profilePicture?: string;
  name: string;
  username: string;
  images?: string[];
  stats?: {
    totalReviews: number;
    holders: number;
    marketCap: string;
    emojiStats: Array<{
      emoji: string;
      count: number;
    }>;
  };
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
  id,
  profilePicture,
  name,
  username,
  rating = 0,
  images = [],
  stats = {
    totalReviews: 0,
    holders: 0,
    marketCap: "$0",
    emojiStats: [],
  },
  reviews = [],
  contractAddress,
  createdAt,
  createdBy,
}: ReviewPageProps) {
  const handleReactionToggle = (reviewId: string, emoji: string) => {
    console.log(`Toggled ${emoji} for review ${reviewId}`);
    // Implement reaction toggle logic here
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ReviewHeader
        id={id}
        profilePicture={profilePicture}
        name={name}
        username={username}
        rating={rating}
        numberOfRatings={stats.totalReviews}
        contractAddress={contractAddress}
        createdAt={createdAt}
        createdBy={createdBy}
      />

      {images.length > 0 && (
        <DynamicMiddle images={images} />
      )}

      <StatsOverview
        totalReviews={stats.totalReviews}
        holders={stats.holders}
        marketCap={stats.marketCap}
        emojiStats={stats.emojiStats}
      />

      <div className="space-y-4 mt-6">
        {reviews.map((review) => (
          <UserReview
            key={review.id}
            {...review}
            onReactionToggle={(emoji) => handleReactionToggle(review.id, emoji)}
          />
        ))}
      </div>
    </div>
  );
}

// Example usage with mock data:
export const mockReviewPage = {
  id: "1",
  profilePicture: "https://example.com/profile.jpg",
  name: "Ethereum",
  username: "ethereum",
  rating: 4.5,
  images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ],
  stats: {
    totalReviews: 1234,
    holders: 5678,
    marketCap: "$1.2B",
    emojiStats: [
      { emoji: "👍", count: 789 },
      { emoji: "❤️", count: 456 },
      { emoji: "🔥", count: 234 },
      { emoji: "😊", count: 123 },
    ],
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