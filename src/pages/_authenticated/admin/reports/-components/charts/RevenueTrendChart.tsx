import { Bar, BarChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/shared/ui/chart';

import { revenueTrend } from '../mock-data';

const chartConfig: ChartConfig = {
  collected: {
    label: 'Collected',
    color: 'var(--color-chart-1)'
  },
  expected: {
    label: 'Expected',
    color: 'var(--color-chart-3)'
  }
};

const formatCompact = (value: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);

export const RevenueTrendChart = () => {
  const totalCollected = revenueTrend.reduce((sum, item) => sum + item.collected, 0);

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Revenue trend</CardTitle>
        <CardDescription>
          {formatCompact(totalCollected)} UZS collected over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <BarChart data={revenueTrend} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='period' tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={48}
              tickFormatter={formatCompact}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(value) => formatCompact(Number(value))} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey='collected' fill='var(--color-collected)' radius={4} />
            <Line
              dataKey='expected'
              type='monotone'
              dot={false}
              stroke='var(--color-expected)'
              strokeDasharray='4 4'
              strokeWidth={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
