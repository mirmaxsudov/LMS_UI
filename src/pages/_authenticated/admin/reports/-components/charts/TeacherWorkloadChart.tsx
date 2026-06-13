import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

import { teacherWorkload } from '../mock-data';

const chartConfig: ChartConfig = {
  lessons: {
    label: 'Lessons taught'
  }
};

export const TeacherWorkloadChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Teacher workload</CardTitle>
        <CardDescription>Lessons taught this month by top teachers</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <BarChart
            data={teacherWorkload}
            margin={{ left: 8, right: 24, top: 8 }}
            layout='vertical'
          >
            <CartesianGrid horizontal={false} />
            <XAxis axisLine={false} tickLine={false} tickMargin={8} type='number' allowDecimals={false} />
            <YAxis
              axisLine={false}
              dataKey='teacher'
              tickLine={false}
              tickMargin={8}
              type='category'
              width={100}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
            <Bar dataKey='lessons' radius={4}>
              {teacherWorkload.map((entry) => (
                <Cell key={entry.teacher} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
