import React from 'react';

export function UserReviewPlaceholder() {
  return (
    <div className="  rounded-lg  w-full pb-6 ">
      <div className='flex w-full items-center justify-between '>
        <div className="flex  w-full items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-[0.5rem] animate-pulse"></div>
        <div className="flex-1 space-y-2.5">
          <div className="h-8 w-1/5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-[10%] bg-gray-200 rounded-full mt-1 animate-pulse"></div>
        </div>
      </div>
      <div className='text-[3rem] opacity-20'>⭐️⭐️⭐️</div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="h-0 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center space-x-2 mt-4">
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
      </div>      
      </div>

     
    </div>
  );
}