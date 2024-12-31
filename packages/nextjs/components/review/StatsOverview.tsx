"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "~~/components/ui/card";

interface StatsOverviewProps {
  totalReviews: number;
  holders: number;
  marketCap: string;
  emojiStats: Array<{
    emoji: string;
    count: number;
  }>;
}

export default function StatsOverview({
  totalReviews = 0,
  holders = 0,
  marketCap = "$0",
  emojiStats = [],
}: StatsOverviewProps) {
  const data = emojiStats.map(stat => ({
    name: stat.emoji,
    value: stat.count,
  }));

  return (
    <Card className="w-full mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">
            Total Reviews
          </span>
          <span className="text-2xl font-bold">{totalReviews}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">
            Holders
          </span>
          <span className="text-2xl font-bold">{holders.toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">
            Market Cap
          </span>
          <span className="text-2xl font-bold">{marketCap}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">
            Reactions
          </span>
          <span className="text-2xl font-bold">
            {emojiStats.reduce((sum, stat) => sum + stat.count, 0)}
          </span>
        </div>
      </div>

      {data.length > 0 && (
        <div className="h-[200px] w-full p-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                className="text-sm font-medium"
                stroke="hsl(var(--foreground))"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                className="text-sm font-medium"
                stroke="hsl(var(--foreground))"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Reaction
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].payload.name}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Count
                            </span>
                            <span className="font-bold">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}