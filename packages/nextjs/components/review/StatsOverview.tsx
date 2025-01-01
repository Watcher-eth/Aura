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

interface StatsOverviewProps {
  totalReviews: number;
  holders: number;
  marketCap: string;
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

export default function StatsOverview({
  totalReviews = 0,
  holders = 0,
  marketCap = "N/A",
  emojiStats = [],
}: StatsOverviewProps) {
  const data = emojiStats.map((stat) => ({
    name: stat.emoji,
    value: stat.count,
  }));
console.log("cap", Number(marketCap), marketCap)
  return (
    <div className="w-full mt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        <div className="flex flex-col">
          <span className="text-md font-medium text-muted-foreground">
            Total Reviews
          </span>
          <span className="text-[2rem] font-bold">{formatNumber(totalReviews)}</span>
          <span className="text-sm  text-muted-foreground">
            Updated 10min ago
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-medium text-muted-foreground">
            Holders
          </span>
          <span className="text-[2rem] font-bold">{formatNumber(holders)}</span>
          <span className="text-sm  text-muted-foreground">
          Updated daily
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-md font-medium text-muted-foreground">
            Market Cap
          </span>
          <span className="text-[2rem] font-bold">{formatNumber(marketCap )}</span>
          <span className="text-sm  text-muted-foreground">
          Updated hourly  
          </span>
        </div>
        {data.length + 1 > 0 && (
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
      )}
      </div>

      
    </div>
  );
}