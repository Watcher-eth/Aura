import { StarIcon } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { type review } from "~~/lib/types/generated/schema.graphql";

interface ReviewHeaderProps {
  name?: string;
  username: string;
  rating: number;
  numberOfRatings: number;
  contractType?: string;
  chainName: string;
  verified: boolean;
}

function ReviewHeader({
  name = 'Unknown Contract',
  username,
  rating = 0,
  numberOfRatings = 0,
  contractType,
  chainName,
  verified,
}: ReviewHeaderProps) {
  const shortAddress = `${username.slice(0, 6)}...${username.slice(-4)}`;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://cdn.stamp.fyi/avatar/${username}`} alt={name} />
          <AvatarFallback>{name?.[0] || '?'}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">{name}</span>
            {verified && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                Verified
              </span>
            )}
            {contractType && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                {contractType}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">@{shortAddress}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{chainName}</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              Average out of {numberOfRatings} Ratings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewHeader;