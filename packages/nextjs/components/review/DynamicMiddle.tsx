"use client";

import React, { useEffect, useState } from 'react';
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
import { getCovalentChainName } from "~~/hooks/func/Covalent";

interface ContractInfo {
  address: string;
  chainId: number;
  type: string;
  name: string;
}

interface DynamicMiddleProps {
  contractInfo?: ContractInfo;
  images?: string[];
}

const ERC20Chart = ({ address, chainId }: { address: string; chainId: number }) => {
  const [priceData, setPriceData] = useState<Array<{ date: string; price: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const chainName = getCovalentChainName(chainId);
        // First try to get token price history
        const priceUrl = `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainName}/${address}/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`;
        const priceResponse = await fetch(priceUrl);
        const priceData = await priceResponse.json();

        if (priceResponse.ok && priceData.data?.[0]?.prices) {
          const history = priceData.data[0].prices.map((item: any) => ({
            date: new Date(item.date).toLocaleDateString(),
            price: item.price || 0
          }));
          setPriceData(history.sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          ));
        } else {
          // Fallback to portfolio data if price history is not available
          const portfolioUrl = `https://api.covalenthq.com/v1/${chainName}/address/${address}/portfolio_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`;
          const portfolioResponse = await fetch(portfolioUrl);
          const portfolioData = await portfolioResponse.json();

          if (portfolioResponse.ok && portfolioData.data?.items?.[0]?.holdings) {
            const history = portfolioData.data.items[0].holdings.map((holding: any) => ({
              date: new Date(holding.timestamp).toLocaleDateString(),
              price: holding.quote_rate || 0
            }));
            setPriceData(history.sort((a, b) => 
              new Date(a.date).getTime() - new Date(b.date).getTime()
            ));
          }
        }
      } catch (error) {
        console.error('Error fetching price data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
  }, [address, chainId]);

  const config = {
    price: {
      label: "Price",
      theme: {
        light: "rgba(75, 192, 192, 1)",
        dark: "rgba(75, 192, 192, 0.8)"
      }
    }
  };

  if (loading) {
    return <div className="w-full h-[400px] flex items-center justify-center">Loading price data...</div>;
  }

  if (priceData.length === 0) {
    return <div className="w-full h-[400px] flex items-center justify-center">No price data available</div>;
  }

  return (
    <div className="w-full h-[400px] p-4">
      <ChartContainer config={config} className="w-full h-full">
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          <RechartsPrimitive.AreaChart data={priceData}>
            <RechartsPrimitive.XAxis dataKey="date" />
            <RechartsPrimitive.YAxis />
            <ChartTooltip />
            <RechartsPrimitive.Area
              type="monotone"
              dataKey="price"
              stroke="rgba(75, 192, 192, 1)"
              fill="rgba(75, 192, 192, 0.2)"
            />
          </RechartsPrimitive.AreaChart>
        </RechartsPrimitive.ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

const NFTGallery = ({ address, chainId, initialImages = [] }: { address?: string; chainId?: number; initialImages?: string[] }) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [loading, setLoading] = useState(!!address);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address || !chainId) return;

      try {
        const chainName = getCovalentChainName(chainId);
        // First get NFT token IDs
        const url = `https://api.covalenthq.com/v1/${chainName}/nft/${address}/metadata/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.data?.items) {
          const nftImages = data.data.items
            .slice(0, 6)
            .map((item: any) => item.nft_data?.external_data?.image)
            console.log("NFT images",data.data.items
              .slice(4, 10).map((item: any) => item.nft_data)
            )

          setImages(nftImages.reverse());
        }
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [address, chainId]);

  if (loading) {
    return     <div className="w-full py-10">
    <Carousel opts={{ align: "start", loop: true }} className="w-full mx-auto">
      <CarouselContent>
        {[0, 1, 2, 3].map((image, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="overflow-hidden">
              <div className="w-full h-0 pb-[100%] relative">
                <div
                  className="absolute inset-0 w-full h-full object-cover bg-gray-200 animate-pulse rounded-md"
                />
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  </div>;
  }

  if (images.length === 0) {
    return <div className="w-full py-10 flex items-center justify-center">No NFTs available</div>;
  }

  return (
    <div className="w-full py-10">
      <Carousel opts={{ align: "start", loop: true }} className="w-full mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden">
                <div className="w-full h-0 pb-[100%] relative">
                  <img
                    src={image}
                    alt={`NFT ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
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

const ContractCode = ({ address, chainId }: { address: string; chainId: number }) => {
  const [sourceCode, setSourceCode] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSourceCode = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
        const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "1" && data.result?.[0]?.SourceCode) {
          setSourceCode(data.result[0].SourceCode);
        }
      } catch (error) {
        console.error('Error fetching source code:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSourceCode();
  }, [address, chainId]);

  if (loading) {
    return <div className="w-full p-4 flex items-center justify-center">Loading source code...</div>;
  }

  if (!sourceCode) {
    return <div className="w-full p-4 flex items-center justify-center">No source code available</div>;
  }

  return (
    <div className="w-full p-4 overflow-x-auto">
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg">
        <code>{sourceCode}</code>
      </pre>
    </div>
  );
};

const DynamicMiddle: React.FC<DynamicMiddleProps> = ({ contractInfo, images = [] }) => {
  // If contractInfo is provided, show the appropriate component based on type
  if (contractInfo) {
    const { type, address, chainId } = contractInfo;
    switch (type) {
      case 'ERC20':
        return <ERC20Chart address={address} chainId={chainId} />;
      case 'ERC721':
      case 'ERC1155':
        return <NFTGallery address={address} chainId={chainId} initialImages={images} />;
      default:
        return <ContractCode address={address} chainId={chainId} />;
    }
  }



  return null;
};

export default DynamicMiddle;