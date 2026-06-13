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

import { children, performanceTrend } from './mock-data';

const chartConfig: ChartConfig = children.reduce<ChartConfig>((config, child) => {
  config[child.id] = { label: child.name.split(' ')[0], color: child.color };
  return config;
}, {});

export const PerformanceTrendChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Performance trend</CardTitle>
        <CardDescription>Average score per child over the last 6 months</CardDescription>
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
            {children.map((child) => (
              <Line
                key={child.id}
                dataKey={child.id}
                type='monotone'
                dot={false}
                stroke={`var(--color-${child.id})`}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
