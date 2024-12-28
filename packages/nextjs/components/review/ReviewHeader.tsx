import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { type review } from "~~/lib/types/generated/schema.graphql";

interface ReviewHeaderProps extends Partial<review> {
  profilePicture?: string;
  name: string;
  username: string;
  numberOfRatings: number;
}

function ReviewHeader({ 
  id, 
  profilePicture, 
  name, 
  username, 
  rating = 0, 
  numberOfRatings,
  contractAddress,
  createdAt,
  createdBy,
}: ReviewHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full p-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profilePicture} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{name}</span>
            <span className="text-muted-foreground">@{username}</span>
          </div>
          <div className="flex items-center space-x-1">
            <StarFilledIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
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