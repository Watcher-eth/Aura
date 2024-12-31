import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Card, CardContent } from "~~/components/ui/card";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Button } from "~~/components/ui/button";
import { type review } from "~~/lib/types/generated/schema.graphql";

interface Reaction {
  emoji: string;
  count: number;
  selected: boolean;
}

interface UserReviewProps extends Partial<review> {
  profilePicture?: string;
  name: string;
  reviewText: string;
  reactions: Reaction[];
  onReactionToggle?: (emoji: string) => void;
}

function UserReview({ 
  profilePicture, 
  name, 
  rating = 0,
  reviewText,
  reactions,
  onReactionToggle,
  id,
  contractAddress,
  createdAt,
  createdBy,
}: UserReviewProps) {
  const [localReactions, setLocalReactions] = useState(reactions);

  const handleReactionClick = (emoji: string) => {
    setLocalReactions(prev => 
      prev.map(reaction => 
        reaction.emoji === emoji 
          ? { ...reaction, selected: !reaction.selected }
          : reaction
      )
    );
    onReactionToggle?.(emoji);
  };

  return (
    <Card className="w-full mt-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profilePicture} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <StarFilledIcon className="h-5 w-5 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
        
        <p className="mt-4 text-muted-foreground">
          {reviewText}
        </p>
        
        <div className="flex justify-end mt-4 space-x-2">
          {localReactions.map((reaction) => (
            <Button
              key={reaction.emoji}
              variant={reaction.selected ? "default" : "outline"}
              size="sm"
              onClick={() => handleReactionClick(reaction.emoji)}
              className="space-x-1"
            >
              <span>{reaction.emoji}</span>
              <span className="text-xs">{reaction.count}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UserReview;