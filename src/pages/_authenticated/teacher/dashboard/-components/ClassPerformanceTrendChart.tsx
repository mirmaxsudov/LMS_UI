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

import { classPerformanceTrend } from './mock-data';

const chartConfig: ChartConfig = {
  averageScore: {
    label: 'Average score',
    color: 'var(--color-chart-1)'
  },
  attendanceRate: {
    label: 'Attendance rate',
    color: 'var(--color-chart-2)'
  }
};

export const ClassPerformanceTrendChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Class performance trend</CardTitle>
        <CardDescription>
          Average score and attendance across all your groups over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <LineChart data={classPerformanceTrend} margin={{ left: -16, right: 12, top: 8 }}>
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
              dataKey='averageScore'
              type='monotone'
              dot={false}
              stroke='var(--color-averageScore)'
              strokeWidth={2}
            />
            <Line
              dataKey='attendanceRate'
              type='monotone'
              dot={false}
              stroke='var(--color-attendanceRate)'
              strokeDasharray='4 4'
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
