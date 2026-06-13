import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/shared/ui/chart';

import { performanceTrend } from './mock-data';

const chartConfig: ChartConfig = {
  average: {
    label: 'Average score',
    color: 'var(--color-chart-1)'
  },
  attendance: {
    label: 'Attendance rate',
    color: 'var(--color-chart-2)'
  }
};

export const PerformanceTrendChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Performance trend</CardTitle>
        <CardDescription>Average score and attendance rate over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <LineChart data={performanceTrend} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='period' tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={48}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey='average'
              type='monotone'
              dot={false}
              stroke='var(--color-average)'
              strokeWidth={2}
            />
            <Line
              dataKey='attendance'
              type='monotone'
              dot={false}
              stroke='var(--color-attendance)'
              strokeDasharray='4 4'
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
