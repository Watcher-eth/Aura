import React from 'react';
import { Card, CardContent } from "~~/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface EmojiStat {
  emoji: string;
  count: number;
}

interface StatsOverviewProps {
  totalReviews: number;
  holders: number;
  marketCap: string;
  emojiStats: EmojiStat[];
}

const StatCard = ({ title, value, subtitle }: { title: string; value: string | number; subtitle: string }) => (
  <div className="flex flex-col items-center text-center">
    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
  </div>
);

function StatsOverview({ totalReviews, holders, marketCap, emojiStats }: StatsOverviewProps) {
  // Sort and get top 4 emoji reactions
  const topEmojis = [...emojiStats]
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)
    .map(stat => ({
      ...stat,
      count: stat.count,
    }));

  return (
    <Card className="w-full mt-6">
      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <StatCard
          title="Total Reviews"
          value={totalReviews.toLocaleString()}
          subtitle="are updated hourly"
        />
        <StatCard
          title="Holders"
          value={holders.toLocaleString()}
          subtitle="are updated daily"
        />
        <StatCard
          title="Mkt Cap"
          value={marketCap}
          subtitle="Updated hourly"
        />
        <div className="h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topEmojis}>
              <XAxis
                dataKey="emoji"
                tick={{ fontSize: 14 }}
                interval={0}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                }}
                cursor={{ fill: "var(--accent)" }}
              />
              <Bar
                dataKey="count"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsOverview;