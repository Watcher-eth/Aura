"use client";

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '~~/components/ui/card';
import { EmojiStatsPlaceholder } from './UserReviewPlaceholder';
import NumberFlow from '@number-flow/react';

interface ContractInfo {
  address: string;
  chainId: number;
  name: string;
  ticker?: string;
  type?: string;
  image?: string;
  marketCap?: number;
  holders?: number;
  createdAt: string;
}

interface StatsOverviewProps {
  totalReviews: number;
  holders: number;
  contractInfo: {type: string, marketCap: number, holders: number};
  emojiStats: Array<{
    emoji: string;
    count: number;
  }>;
}

function formatNumber(num: string | number): string {
  const n = typeof num === 'string' ? parseFloat(num.replace(/[^0-9.-]+/g, ""))/ 10**6 : num / 10**6;
  if (isNaN(n)) return num.toString();
  
  if (n >= 1e15) return (n / 1e15).toFixed(1) + 'Quin';
  if (n >= 1e12) return (n / 1e12).toFixed(1) + 'Tril';
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'Bil';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'Mil';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toString();
}

const formatPrice = (price: number) => {
  if (price === 0) return '0.00';
  if (price < 0.0001) return price.toExponential(2);
  if (price < 1) return price.toFixed(6);
  if (price < 10) return price.toFixed(4);
  if (price < 100) return price.toFixed(3);
  return price.toFixed(2);
};

export default function StatsOverview({
  totalReviews = 0,
  holders = 0,
  contractInfo,
  emojiStats = [],
}: StatsOverviewProps) {
  const { marketCap, type } = contractInfo;

  const data = emojiStats.map((stat) => ({
    name: stat.emoji,
    value: stat.count,
  }));

  console.log("lenght",data ?? "Yes")

  return (
    <div className="w-full mb-1 md:mb-5 md:mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 ">
        <div className="flex flex-col">
          <span className="text-md font-medium text-muted-foreground">
            Total Reviews
          </span>
          <span className="text-[2rem] font-bold">{totalReviews}</span>
          <span className="text-sm  text-muted-foreground">
            Updated 10min ago
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-medium text-muted-foreground">
            Holders
          </span>
          <span className="text-[2rem] font-bold">{holders}</span>
          <span className="text-sm  text-muted-foreground">
          Updated daily
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-medium text-muted-foreground">
            {contractInfo?.type === "ERC721" || contractInfo?.type === "ERC1155" ? "Floor Price" : "Current Price"}
          </span>
          <span className="text-[2rem] font-bold">
            $<NumberFlow 
              value={contractInfo?.marketCap || 0} 
              format={{ 
                minimumFractionDigits: 2,
                maximumFractionDigits: (contractInfo?.marketCap || 0) < 1 ? 6 : 2
              }}
            />
          </span>
          <span className="text-sm  text-muted-foreground">
          Updated hourly  
          </span>
        </div>
        {data.length  > 0 ?(
        <div className="h-[200px] w-full p-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f3f4f6"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 20 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                cursor={{ fill: '#f3f4f6' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg shadow-lg p-2">
                        <p className="text-sm">
                          {payload[0].payload.name}:{' '}
                          {payload[0].value?.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ): <EmojiStatsPlaceholder/>}
      </div>

      
    </div>
  );
}