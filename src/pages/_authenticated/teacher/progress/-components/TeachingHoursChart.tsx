import { Cell, Pie, PieChart } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

import { teachingHours } from './mock-data';

const chartConfig: ChartConfig = teachingHours.reduce<ChartConfig>((config, item) => {
  config[item.label] = { label: item.label, color: item.color };
  return config;
}, {});

export const TeachingHoursChart = () => {
  const total = teachingHours.reduce((sum, item) => sum + item.hours, 0);

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Teaching hours by group</CardTitle>
        <CardDescription>{total} hours taught this term</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-4'>
        <div className='relative w-full'>
          <ChartContainer className='aspect-square h-[220px] w-full' config={chartConfig}>
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel nameKey='label' />} />
              <Pie
                data={teachingHours}
                dataKey='hours'
                innerRadius={55}
                nameKey='label'
                paddingAngle={2}
                outerRadius={85}
                strokeWidth={4}
              >
                {teachingHours.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <p className='text-2xl font-semibold'>{total}h</p>
            <p className='text-muted-foreground text-xs'>Total</p>
          </div>
        </div>
        <div className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2'>
          {teachingHours.map((item) => (
            <div key={item.label} className='flex items-center justify-between gap-2 text-xs'>
              <div className='flex items-center gap-1.5'>
                <span className='size-2 rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-muted-foreground'>{item.label}</span>
              </div>
              <span className='font-semibold'>{item.hours}h</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
