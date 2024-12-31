"use client";
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Card, CardContent } from "~~/components/ui/card";
import { Button } from "~~/components/ui/button";
import { Star } from 'lucide-react';

interface Reaction {
  emoji: string;
  count: number;
  selected: boolean;
}

interface UserReviewProps {
  profilePicture?: string;
  name: string;
  rating: number;
  reviewText: string;
  reactions: Reaction[];
}

function UserReview({
  profilePicture,
  name,
  rating,
  reviewText,
  reactions,
}: UserReviewProps) {
  const [localReactions, setLocalReactions] = useState(reactions);

  const handleReactionClick = (emoji: string) => {
    setLocalReactions(prev =>
      prev.map(reaction =>
        reaction.emoji === emoji
          ? {
              ...reaction,
              selected: !reaction.selected,
              count: reaction.selected ? reaction.count - 1 : reaction.count + 1,
            }
          : reaction
      )
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={profilePicture} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">{rating}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4">{reviewText}</p>

        <div className="flex flex-wrap gap-2">
          {localReactions.map((reaction) => (
            <Button
              key={reaction.emoji}
              variant={reaction.selected ? "secondary" : "outline"}
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