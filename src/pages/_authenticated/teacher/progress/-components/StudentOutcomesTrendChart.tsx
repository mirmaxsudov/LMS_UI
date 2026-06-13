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

import { studentOutcomeTrend } from './mock-data';

const chartConfig: ChartConfig = {
  avgScore: {
    label: 'Average score',
    color: 'var(--color-chart-1)'
  },
  attendanceRate: {
    label: 'Attendance rate',
    color: 'var(--color-chart-2)'
  },
  passRate: {
    label: 'Pass rate',
    color: 'var(--color-chart-5)'
  }
};

export const StudentOutcomesTrendChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Student outcomes</CardTitle>
        <CardDescription>
          How your students are performing under your teaching, over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[300px] w-full' config={chartConfig}>
          <LineChart data={studentOutcomeTrend} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='period' tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={48}
              domain={[60, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip content={<ChartTooltipContent indicator='line' />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey='avgScore'
              type='monotone'
              activeDot={{ r: 5 }}
              dot={{ fill: 'var(--color-avgScore)', r: 3 }}
              stroke='var(--color-avgScore)'
              strokeWidth={2.5}
            />
            <Line
              dataKey='attendanceRate'
              type='monotone'
              dot={false}
              stroke='var(--color-attendanceRate)'
              strokeDasharray='4 4'
              strokeWidth={2}
            />
            <Line
              dataKey='passRate'
              type='monotone'
              dot={false}
              stroke='var(--color-passRate)'
              strokeDasharray='2 2'
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
