import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

import { groupPerformance } from '../mock-data';

const chartConfig: ChartConfig = {
  averageScore: {
    label: 'Average score'
  }
};

export const PerformanceByGroupChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Performance by group</CardTitle>
        <CardDescription>Average score per group this term</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[320px] w-full' config={chartConfig}>
          <BarChart
            data={groupPerformance}
            margin={{ left: 8, right: 24, top: 8 }}
            layout='vertical'
          >
            <CartesianGrid horizontal={false} />
            <XAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              type='number'
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              axisLine={false}
              dataKey='group'
              tickLine={false}
              tickMargin={8}
              type='category'
              width={160}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel formatter={(value) => `${value}%`} />}
              cursor={false}
            />
            <Bar dataKey='averageScore' radius={4}>
              {groupPerformance.map((entry) => (
                <Cell key={entry.group} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
