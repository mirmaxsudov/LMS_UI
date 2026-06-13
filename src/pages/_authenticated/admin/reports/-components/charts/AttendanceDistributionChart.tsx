import { Cell, Pie, PieChart } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

import { attendanceDistribution } from '../mock-data';

const chartConfig: ChartConfig = attendanceDistribution.reduce<ChartConfig>((config, item) => {
  config[item.label] = { label: item.label, color: item.color };
  return config;
}, {});

export const AttendanceDistributionChart = () => {
  const total = attendanceDistribution.reduce((sum, item) => sum + item.value, 0);
  const presentRate = Math.round(
    ((attendanceDistribution.find((item) => item.label === 'Present')?.value ?? 0) / total) * 100
  );

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Attendance breakdown</CardTitle>
        <CardDescription>This month - {total.toLocaleString()} records total</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-4'>
        <div className='relative w-full'>
          <ChartContainer className='aspect-square h-[220px] w-full' config={chartConfig}>
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel nameKey='label' />} />
              <Pie
                data={attendanceDistribution}
                dataKey='value'
                innerRadius={55}
                nameKey='label'
                paddingAngle={2}
                outerRadius={85}
                strokeWidth={4}
              >
                {attendanceDistribution.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <p className='text-2xl font-semibold'>{presentRate}%</p>
            <p className='text-muted-foreground text-xs'>Present</p>
          </div>
        </div>
        <div className='grid w-full grid-cols-2 gap-2 text-center'>
          {attendanceDistribution.map((item) => (
            <div key={item.label} className='space-y-1'>
              <div className='flex items-center justify-center gap-1.5'>
                <span className='size-2 rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-muted-foreground text-xs'>{item.label}</span>
              </div>
              <p className='text-sm font-semibold'>{item.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
