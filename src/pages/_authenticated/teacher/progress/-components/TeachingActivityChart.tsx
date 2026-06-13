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

import { teachingActivity } from './mock-data';

const chartConfig: ChartConfig = {
  lessonsDelivered: {
    label: 'Lessons delivered',
    color: 'var(--color-chart-1)'
  },
  lessonsPlanned: {
    label: 'Lessons planned',
    color: 'var(--color-chart-3)'
  },
  hoursTaught: {
    label: 'Hours taught',
    color: 'var(--color-chart-2)'
  }
};

export const TeachingActivityChart = () => {
  const totalDelivered = teachingActivity.reduce((sum, item) => sum + item.lessonsDelivered, 0);
  const totalHours = teachingActivity.reduce((sum, item) => sum + item.hoursTaught, 0);

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Teaching activity</CardTitle>
        <CardDescription>
          {totalDelivered} lessons delivered · {totalHours} hours taught over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[300px] w-full' config={chartConfig}>
          <BarChart data={teachingActivity} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='period' tickLine={false} tickMargin={8} />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} width={32} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey='lessonsDelivered' fill='var(--color-lessonsDelivered)' radius={4} />
            <Bar dataKey='lessonsPlanned' fill='var(--color-lessonsPlanned)' radius={4} />
            <Line
              dataKey='hoursTaught'
              type='monotone'
              dot={{ fill: 'var(--color-hoursTaught)', r: 3 }}
              stroke='var(--color-hoursTaught)'
              strokeWidth={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
