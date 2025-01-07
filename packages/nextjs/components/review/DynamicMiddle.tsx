// @ts-nocheck

"use client";

import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~~/components/ui/carousel";
import { Card } from "~~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
} from "~~/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { getCovalentChainName } from "~~/hooks/func/Covalent";
import { useTokenPrice } from "~~/hooks/useTokenPrice";
import { ContractInfo } from '~~/utils/getContractInfo';
import ContractCode from './ContractCode';

interface Props {
  contractInfo: {
    address: string;
    chainId: number;
    type: string;
    name?: string;
    chainName: string;
    createdAt: string;
  };
  images?: string[];
}

const ERC20Chart = ({ contractInfo }: { contractInfo: ContractInfo }) => {
  const { priceData, loading, error } = useTokenPrice(contractInfo.address, contractInfo.chainId);
  const [selectedPeriod, setSelectedPeriod] = useState("1D");

  if (loading) {
    return (
      <div className="w-full h-[400px] p-4">
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error || priceData.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        {error || 'No price data available'}
      </div>
    );
  }

  const latestPrice = priceData[priceData.length - 1]?.price || 0;
  const previousPrice = priceData[priceData.length - 2]?.price || latestPrice;
  const priceChange = ((latestPrice - previousPrice) / previousPrice) * 100;
  const isPositive = priceChange >= 0;

  // Calculate min and max for the domain
  const prices = priceData.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice) * 0.1; // Add 10% padding to the range

  const chartConfig = {
    price: {
      label: "Price",
      color: "#000000"
    }
  };

  // Calculate interval for X-axis ticks (show roughly half the dates)
  const interval = Math.ceil(priceData.length / 6);

  const getPriceFormat = (price: number) => {
    if (price === 0) return { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    if (price < 0.0001) return { minimumFractionDigits: 3, maximumSignificantDigits: 3 } as const;
    if (price < 1) return { minimumFractionDigits: 5, maximumFractionDigits: 7 };
    return { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  };

  return (
    <div className="w-full py-6 pt-4 flex flex-col">
      	  <NumberFlowGroup>
      <div className="flex self-end items-baseline gap-2 mb-6">
        <span className={`text-lg font-semibold ${isPositive ? 'text-[#00FF85]' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} <NumberFlow value={Math.abs(priceChange)} format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }} />%
        </span>
        <h2 className="text-4xl font-bold">
          $<NumberFlow 
            value={latestPrice} 
            format={getPriceFormat(latestPrice)}
          />
        </h2>
      </div></NumberFlowGroup>

      <div className="h-[35ch] -mt-4">
        <ChartContainer className="w-full h-full" config={chartConfig}>
          <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
            <RechartsPrimitive.LineChart 
              data={priceData}
              margin={{ top: 10, right: 50, bottom: 0, left: 10 }}
            >
              <RechartsPrimitive.XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
                interval={interval}
                tickMargin={10}
              />
              <RechartsPrimitive.YAxis 
                hide={true}
                domain={[minPrice - padding, maxPrice + padding]}
              />
              <RechartsPrimitive.Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                strokeWidth={3.5}
                dot={false}
                activeDot={{ r: 6, fill: '#000' }}
                isAnimationActive={true}
              >
                <RechartsPrimitive.Dot r={4} fill="#000" />
              </RechartsPrimitive.Line>
            </RechartsPrimitive.LineChart>
          </RechartsPrimitive.ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

const NFTGallery = ({ address, chainId, initialImages = [] }: { address?: string; chainId?: number; initialImages?: string[] }) => {
  const [images, setImages] = React.useState<string[]>(initialImages.filter(Boolean));
  const [loading, setLoading] = React.useState(!!address);

  React.useEffect(() => {
    const fetchNFTs = async () => {
      if (!address || !chainId) return;

      try {
        const chainName = getCovalentChainName(chainId);
        const url = `https://api.covalenthq.com/v1/${chainName}/nft/${address}/metadata/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.data?.items) {
          const nftImages = data.data.items
            .slice(0, 6)
            .map((item: any) => {
              const nftData = Array.isArray(item.nft_data) ? item.nft_data[0] : item.nft_data;
              return nftData?.external_data?.image;
            })
            .filter(Boolean);

          setImages(prevImages => {
            const allImages = [...prevImages, ...nftImages];
            return [...new Set(allImages)].slice(0, 6);
          });
        }
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [address, chainId]);

  const LoadingCarousel = () => (
    <div className="w-full py-10">
      <Carousel opts={{ align: "start", loop: true }} className="w-full mx-auto">
        <CarouselContent>
          {[0, 1, 2, 3].map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden">
                <div className="w-full h-0 pb-[100%] relative">
                  <div className="absolute inset-0 w-full h-full object-cover bg-gray-200 animate-pulse rounded-md" />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );

  if (loading) {
    return <LoadingCarousel />;
  }

  if (images.length === 0) {
    return (
      <div className="w-full py-10 flex items-center justify-center text-gray-500">
        No images available
      </div>
    );
  }

  return (
    <div className="w-full py-10">
      <Carousel opts={{ align: "start", loop: true }} className="w-full mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 hover:scale-101 lg:basis-1/3">
              <Card className="overflow-hidden ">
                <div className="w-full h-0 pb-[100%] relative">
                  <img
                    src={image}
                    alt={`NFT ${index + 1}`}
                    className="absolute hover:scale-101 inset-0 w-full h-full object-cover rounded-md"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

const DynamicMiddle: React.FC<Props> = ({ contractInfo, images = [] }) => {
  return (
    <div className="w-full">
      {contractInfo.type === 'ERC20' ? (
        <ERC20Chart contractInfo={contractInfo} />
      ) : contractInfo.type === 'ERC721' || contractInfo.type === 'ERC1155' ? (
        <NFTGallery address={contractInfo.address} chainId={contractInfo.chainId} initialImages={images} />
      ) : (
        <ContractCode 
          name={contractInfo.name || ''} 
          address={contractInfo.address} 
          chainId={contractInfo.chainId} 
        />
      )}
    </div>
  );
};

export default DynamicMiddle;