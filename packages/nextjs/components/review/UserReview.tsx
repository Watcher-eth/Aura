"use client";
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Card, CardContent } from "~~/components/ui/card";
import { Button } from "~~/components/ui/button";
import { Star } from 'lucide-react';
import { Review } from '~~/__generated__/graphql';
import { storageClient } from '~~/utils/storageClient';
import { emotions } from '~~/components/modals/steps/ReviewStepOne';

interface ReviewMetadata {
  address: string;
  rating: number;
  emotions: string[];
  content: string;
  timestamp: string;
}

interface Reaction {
  emoji: string;
  selected: boolean;
}

interface UserReviewProps extends Review {
  reactions?: Reaction[];
}

function UserReview({
  contractAddress,
  createdAt,
  createdBy,
  rating,
  metadataURI
}: UserReviewProps) {
  const [reviewData, setReviewData] = useState<ReviewMetadata | null>(null);
  const [localReactions] = useState<Reaction[]>([
    { emoji: "🔥", selected: false },
    { emoji: "👀", selected: false },
    { emoji: "🚀", selected: false },
    { emoji: "🤣", selected: false },
    { emoji: "📝", selected: false },
  ]);

  const resolveMetadata = async () => {
    if (metadataURI) {
      try {
        const url = await storageClient.resolve(metadataURI);
        const response = await fetch(url);
        const data = await response.json();
        setReviewData(data);
      } catch (error) {
        console.error("Error resolving metadata:", error);
      }
    }
  };

  useEffect(() => {
    resolveMetadata();
  }, [metadataURI]);

  const getEmojiForLabel = (label: string) => {
    const emotion = emotions.find(e => e.label === label);
    return emotion?.emoji || label;
  };

  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent className="p-0 border-0 shadow-none">
        <div className="flex items-start justify-between mb-4 w-full border-0">
          <div className="flex items-center space-x-4 w-full border-0">
              <img className='h-[5.5rem] w-[5.5rem] border-[0.1rem] border-[#f0f0f0] rounded-[0.5rem]' src={"https://f8n-production-collection-assets.imgix.net/1/0x8F9E7fea47ac4D14D92E945ccf3F74e86b256461/69/nft.jpg?auto=format%2Ccompress&q=70&cs=srgb&h=1200&w=1200&fnd_key=v1"} />
            <div className='flex items-center justify-between w-full'>
              <div className="flex flex-col items-start  ">
                <span className="font-medium text-[1.7rem]">{createdBy.slice(0, 6)}...{createdBy.slice(-4)}</span>
                <span className="text-sm text-blue-500 mt-1 bg-blue-100 px-2 py-0.5  rounded-full">
                  1 Txs w/ contract
                </span>
              </div>
              <div className="flex items-center space-x-1">
              <span className="text-[2.5rem] font-bold text-[#303030] mr-1.5">{rating}</span>
                <div className="flex text-[3rem]">
                  {[...Array(rating)].map((_, index) => (
                   <div key={index}>⭐️</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-gray-600 mb-6">
          {reviewData?.content ? (
            <p>{reviewData.content}</p>
          ) : (
            
            <div className="mt-4 space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse"></div>
          </div>
    
          )}
        </div>

        <div className="flex flex-wrap gap-1 self-end justify-end">
          {reviewData?.emotions ? (
            reviewData.emotions.map((emotionLabel, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-xl border-0 px-1 py-1 h-auto"
              >
                {getEmojiForLabel(emotionLabel)}
              </Button>
            ))
          ) : (
  <div className="flex items-center justify-between mt-4">
        <div className="h-0 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center space-x-2 mt-4">
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>      

</div>          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default UserReview;