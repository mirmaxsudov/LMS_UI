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

import { weeklyLessons } from './mock-data';

const chartConfig: ChartConfig = {
  lessons: {
    label: 'Lessons taught',
    color: 'var(--color-chart-1)'
  },
  plannedLessons: {
    label: 'Planned lessons',
    color: 'var(--color-chart-3)'
  }
};

export const WeeklyLessonsChart = () => {
  const totalLessons = weeklyLessons.reduce((sum, item) => sum + item.lessons, 0);

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Weekly lessons</CardTitle>
        <CardDescription>{totalLessons} lessons taught this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <BarChart data={weeklyLessons} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='day' tickLine={false} tickMargin={8} />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} width={32} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey='lessons' fill='var(--color-lessons)' radius={4} />
            <Line
              dataKey='plannedLessons'
              type='monotone'
              dot={false}
              stroke='var(--color-plannedLessons)'
              strokeDasharray='4 4'
              strokeWidth={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
