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

import { gradingTurnaround } from './mock-data';

const chartConfig: ChartConfig = {
  avgDays: {
    label: 'Avg. days to grade',
    color: 'var(--color-chart-1)'
  },
  target: {
    label: 'Target',
    color: 'var(--color-muted-foreground)'
  }
};

export const GradingTurnaroundChart = () => {
  const latest = gradingTurnaround[gradingTurnaround.length - 1];

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Grading turnaround</CardTitle>
        <CardDescription>
          Currently averaging {latest?.avgDays} days per submission, target is{' '}
          {latest?.target} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <BarChart data={gradingTurnaround} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='period' tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={32}
              tickFormatter={(value) => `${value}d`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey='avgDays' fill='var(--color-avgDays)' radius={4} />
            <Line
              dataKey='target'
              type='monotone'
              dot={false}
              stroke='var(--color-target)'
              strokeDasharray='4 4'
              strokeWidth={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
