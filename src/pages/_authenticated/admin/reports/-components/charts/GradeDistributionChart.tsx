import { Cell, Pie, PieChart } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

import { gradeDistribution } from '../mock-data';

const chartConfig: ChartConfig = gradeDistribution.reduce<ChartConfig>((config, item) => {
  config[item.label] = { label: item.label, color: item.color };
  return config;
}, {});

export const GradeDistributionChart = () => {
  const total = gradeDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Grade distribution</CardTitle>
        <CardDescription>{total.toLocaleString()} students across all groups</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-4'>
        <ChartContainer className='aspect-square h-[220px] w-full' config={chartConfig}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey='label' />} />
            <Pie
              data={gradeDistribution}
              dataKey='value'
              nameKey='label'
              paddingAngle={2}
              outerRadius={85}
              strokeWidth={4}
            >
              {gradeDistribution.map((entry) => (
                <Cell key={entry.label} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className='grid w-full grid-cols-1 gap-2'>
          {gradeDistribution.map((item) => (
            <div key={item.label} className='flex items-center justify-between gap-2 text-sm'>
              <div className='flex items-center gap-1.5'>
                <span className='size-2 rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-muted-foreground text-xs'>{item.label}</span>
              </div>
              <span className='font-semibold'>{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
