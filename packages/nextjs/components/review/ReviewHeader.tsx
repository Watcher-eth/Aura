import { Calendar, Plus, StarIcon } from 'lucide-react';
import React from 'react';
import { getChainLogo } from '~~/utils/chainLogos';

interface ReviewHeaderProps {
  name?: string;
  address: string;
  rating: number;
  numberOfRatings: number;
  contractType?: string;
  chainId: number;
  verified: boolean;
  ticker?: string;
  image: string;
  createdAt: string;
  type: string
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
  image,
  createdAt,
  type
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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '.');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return Array(5).fill('⭐️').map((star, index) => (
      <span key={index} className={index < roundedRating ? '' : 'opacity-20'}>
        {star}
      </span>
    ));
  };

  return (
    <div className="flex flex-col space-y-4 -mt-2">
      <div className="flex items-center justify-between">      
        <div className="flex items-center space-x-1.5 mb-1.5">
          <div className='text-md text-gray-400'>{chainName} Network</div>
          <img className='h-4 w-4 rounded-full object-cover' src={getChainLogo(chainId)} alt={chainName} />
          <div className='text-md text-gray-400'>{'>'}</div>
          <div className='text-md text-gray-400'>{shortAddress}</div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <img className='h-[6rem] w-[6rem] rounded-[0.65rem] object-cover' src={image} alt={name} />
          <div className="flex flex-col -mt-1.5">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[2.1rem]">{name}</span>
              <span className="font-medium text-gray-400 text-[2.1rem]">${ticker}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-[#fefefe] border-[0.1rem] border-[#ededed] flex items-center rounded-full text-sm"><Calendar color='#aaaaaa' className='mr-1' size={14}/><div>{formatDate(createdAt)}</div></span>
              <span className={`px-2 py-1 ${type === "ERC20" ? "bg-[#1F75FE]/10 border-[0.1rem] border-[#1F75FE] text-[#1F75FE]" :  type === "ERC721" ? "bg-[#FF007F]/10 border-[0.1rem] border-[#FF007F] text-[#FF007F]" : "bg-[#FF7518]/10 border-[0.1rem] border-[#FF7518] text-[#FF7518]"} rounded-full text-sm`}>{type}</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              {verified && (
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
              {contractType && (
                <span className={`text-sm bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full`}>
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