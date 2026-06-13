import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/shared/ui/chart';

import { performanceTrend } from './mock-data';

const chartConfig: ChartConfig = {
  you: {
    label: 'Your average',
    color: 'var(--color-chart-1)'
  },
  classAverage: {
    label: 'Class average',
    color: 'var(--color-chart-2)'
  }
};

export const PerformanceTrendChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Performance trend</CardTitle>
        <CardDescription>Your average score vs. class average over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <LineChart data={performanceTrend} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='period' tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              tickMargin={8}
              width={48}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey='you'
              dot={false}
              stroke='var(--color-you)'
              strokeWidth={2}
              type='monotone'
            />
            <Line
              dataKey='classAverage'
              dot={false}
              stroke='var(--color-classAverage)'
              strokeDasharray='4 4'
              strokeWidth={2}
              type='monotone'
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
