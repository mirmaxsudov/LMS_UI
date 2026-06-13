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

import { enrollmentTrend } from '../mock-data';

const chartConfig: ChartConfig = {
  newStudents: {
    label: 'New students',
    color: 'var(--color-chart-1)'
  },
  withdrawals: {
    label: 'Withdrawals',
    color: 'var(--color-destructive)'
  }
};

export const EnrollmentTrendChart = () => {
  const netGrowth = enrollmentTrend.reduce(
    (sum, item) => sum + item.newStudents - item.withdrawals,
    0
  );

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Enrollment trend</CardTitle>
        <CardDescription>Net growth of {netGrowth} students over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <BarChart data={enrollmentTrend} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='period' tickLine={false} tickMargin={8} />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} width={32} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey='newStudents' fill='var(--color-newStudents)' radius={4} />
            <Line
              dataKey='withdrawals'
              type='monotone'
              dot={false}
              stroke='var(--color-withdrawals)'
              strokeDasharray='4 4'
              strokeWidth={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
