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

import { weeklyActivity } from './mock-data';

const chartConfig: ChartConfig = {
  hours: {
    label: 'Hours studied',
    color: 'var(--color-chart-1)'
  },
  goalHours: {
    label: 'Daily goal',
    color: 'var(--color-chart-3)'
  }
};

export const WeeklyActivityChart = () => {
  const totalHours = weeklyActivity.reduce((sum, item) => sum + item.hours, 0);

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Weekly study activity</CardTitle>
        <CardDescription>{totalHours.toFixed(1)} hours studied this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <BarChart data={weeklyActivity} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='day' tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={40}
              tickFormatter={(value) => `${value}h`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey='hours' fill='var(--color-hours)' radius={4} />
            <Line
              dataKey='goalHours'
              type='monotone'
              dot={false}
              stroke='var(--color-goalHours)'
              strokeDasharray='4 4'
              strokeWidth={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
