import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

import { attendanceTrend } from '../mock-data';

const chartConfig: ChartConfig = {
  rate: {
    label: 'Attendance rate',
    color: 'var(--color-chart-1)'
  }
};

export const AttendanceTrendChart = () => {
  const latest = attendanceTrend[attendanceTrend.length - 1]?.rate ?? 0;

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Attendance rate trend</CardTitle>
        <CardDescription>{latest}% average attendance this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <LineChart data={attendanceTrend} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='period' tickLine={false} tickMargin={8} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={40}
              domain={[70, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(value) => `${value}%`} />}
            />
            <Line
              dataKey='rate'
              type='monotone'
              dot={{ r: 3 }}
              stroke='var(--color-rate)'
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
