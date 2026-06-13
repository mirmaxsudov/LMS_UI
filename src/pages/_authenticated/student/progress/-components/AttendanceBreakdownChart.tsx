import { Cell, Pie, PieChart } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

import { attendanceBreakdown } from './mock-data';

const chartConfig: ChartConfig = attendanceBreakdown.reduce<ChartConfig>((config, item) => {
  config[item.label] = { label: item.label, color: item.color };
  return config;
}, {});

export const AttendanceBreakdownChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Attendance breakdown</CardTitle>
        <CardDescription>This term</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-4'>
        <ChartContainer className='aspect-square h-[220px] w-full' config={chartConfig}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey='label' />} />
            <Pie
              data={attendanceBreakdown}
              dataKey='value'
              innerRadius={55}
              nameKey='label'
              paddingAngle={2}
              outerRadius={85}
              strokeWidth={4}
            >
              {attendanceBreakdown.map((entry) => (
                <Cell key={entry.label} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className='grid w-full grid-cols-3 gap-2 text-center'>
          {attendanceBreakdown.map((item) => (
            <div key={item.label} className='space-y-1'>
              <div className='flex items-center justify-center gap-1.5'>
                <span className='size-2 rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-muted-foreground text-xs'>{item.label}</span>
              </div>
              <p className='text-sm font-semibold'>{item.value}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
