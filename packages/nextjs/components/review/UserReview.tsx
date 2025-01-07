"use client";
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Card, CardContent } from "~~/components/ui/card";
import { Button } from "~~/components/ui/button";
import { Star } from 'lucide-react';
import { Review } from '~~/__generated__/graphql';
import { storageClient } from '~~/utils/storageClient';
import { shortenAddress } from '~~/utils/address';

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
  const [localReactions] = useState<Reaction[]>([
    { emoji: "🔥", selected: false },
    { emoji: "👀", selected: false },
    { emoji: "🚀", selected: false },
    { emoji: "🤣", selected: false },
    { emoji: "📝", selected: false },
  ]);

  const resolveMetadata = async () => {
    if (metadataURI) {
      const url = await storageClient.resolve(metadataURI);
      return url;
    }
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
                   <div>⭐️</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-gray-600 mb-6">
          <p>I've been using Aave for over a year now, and it's hands down one of the best DeFi protocols out there. The smart contract is rock-solid, with audits to back its security. The interface is smooth and intuitive, even for newcomers, and the variety of assets supported is impressive.</p>
          <p>One thing I love is the transparency—every interaction is traceable on-chain, giving me confidence in where my funds are. The flash loan feature is a game-changer for advanced users, though it might feel a bit intimidating if you're just starting out.</p>
          <p>That said, gas fees can still bite when the network is congested, and borrowing rates sometimes fluctuate more than I'd like. Still, compared to other lending protocols, Aave sets a high standard.</p>
          <p>If you're looking for a secure and flexible way to lend or borrow in DeFi, Aave is a must-try. Just be sure to DYOR and start small if you're new to decentralized finance! ↗</p>
        </div>

        <div className="flex flex-wrap gap-2 self-end justify-end">
          {localReactions.map((reaction) => (
            <Button
              key={reaction.emoji}
              variant="outline"
              className="text-lg border-0 px-2 py-1 h-auto"
            >
              {reaction.emoji}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UserReview;