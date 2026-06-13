import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/shared/ui/chart';

import { attendanceComparison } from './mock-data';

const chartConfig: ChartConfig = {
  present: {
    label: 'Present',
    color: 'var(--color-success)'
  },
  late: {
    label: 'Late',
    color: 'var(--color-chart-3)'
  },
  absent: {
    label: 'Absent',
    color: 'var(--color-destructive)'
  }
};

export const AttendanceComparisonChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Attendance comparison</CardTitle>
        <CardDescription>This month&#39;s attendance breakdown per child</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[280px] w-full' config={chartConfig}>
          <BarChart data={attendanceComparison} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey='name' tickLine={false} tickMargin={8} />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey='present' fill='var(--color-present)' radius={[4, 4, 0, 0]} stackId='a' />
            <Bar dataKey='late' fill='var(--color-late)' radius={[4, 4, 0, 0]} stackId='a' />
            <Bar dataKey='absent' fill='var(--color-absent)' radius={[4, 4, 0, 0]} stackId='a' />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
