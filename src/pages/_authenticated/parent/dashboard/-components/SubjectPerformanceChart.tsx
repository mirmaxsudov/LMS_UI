import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/shared/ui/chart';

import { children, subjectPerformance } from './mock-data';

const chartConfig: ChartConfig = children.reduce<ChartConfig>((config, child) => {
  config[child.id] = { label: child.name.split(' ')[0], color: child.color };
  return config;
}, {});

export const SubjectPerformanceChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Subject performance</CardTitle>
        <CardDescription>Average scores by subject for each child</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='mx-auto aspect-square h-[320px] w-full' config={chartConfig}>
          <RadarChart data={subjectPerformance}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='subject' />
            <PolarGrid />
            {children.map((child) => (
              <Radar
                key={child.id}
                dataKey={child.id}
                fill={`var(--color-${child.id})`}
                fillOpacity={0.15}
                stroke={`var(--color-${child.id})`}
                strokeWidth={2}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
