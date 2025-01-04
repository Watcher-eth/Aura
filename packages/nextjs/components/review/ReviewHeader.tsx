import { StarIcon } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { getChainLogo } from '~~/utils/chainLogos';
import { type review } from "~~/lib/types/generated/schema.graphql";

interface ReviewHeaderProps {
  name?: string;
  address: string;
  rating: number;
  numberOfRatings: number;
  contractType?: string;
  chainId: number;
  verified: boolean;
  ticker?: string;
  image: string
}

function ReviewHeader({
  name = 'Unknown Contract',
  address,
  rating = 0,
  numberOfRatings = 0,
  contractType,
  chainId,
  verified,
  ticker,
  image
}: ReviewHeaderProps) {
  const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  
  const chainName = {
    1: 'Ethereum',
    137: 'Polygon',
    42161: 'Arbitrum',
    10: 'Optimism',
    8453: 'Base',
    56: 'BSC',
    324: 'zkSync Era'
  }[chainId] || 'Unknown Chain';

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return Array(5).fill('⭐️').map((star, index) => (
      <span key={index} className={index < roundedRating ? '' : 'opacity-20'}>
        {star}
      </span>
    ));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">      
        <div className="flex items-center space-x-1.5 mb-1.5">
          <div className='text-md text-gray-400'>{chainName} Network</div>
          <img className='h-4 w-4 rounded-full object-cover' src={getChainLogo(chainId)} alt={chainName} />
          <div className='text-md text-gray-400'>{'>'}</div>
          <div className='text-md text-gray-400'>{shortAddress}</div>
        </div>
        <div className='px-4 py-1.5 rounded-md border-2 border-[#ededed] bg-[white]'>Write a Review</div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <img className='h-[6rem] w-[6rem] rounded-[0.65rem] object-cover' src={image} alt={name} />
          <div className="flex flex-col -mt-1.5">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[2.1rem]">{name}</span>
              <span className="font-medium text-gray-400 text-[2.1rem]">${ticker}</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              {verified && (
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
              {contractType && (
                <span className="text-sm bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                  {contractType}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col -mt-1.5">
          <div className="flex items-center space-x-1 text-[2.1rem]">
            {renderStars(rating)}
          </div>
          <div className="text-sm text-gray-400 mt-1 self-end">
            Average out of {numberOfRatings} {numberOfRatings === 1 ? 'Rating' : 'Ratings'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewHeader;