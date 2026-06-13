import { Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';

import type { ChartConfig } from '@/shared/ui/chart';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/shared/ui/chart';

import { attendanceBreakdown, performanceTrend } from './mock-data';

const performanceConfig = {
  student: { label: 'Amina', color: 'var(--color-chart-1)' },
  classAverage: { label: 'Class average', color: 'var(--color-chart-2)' }
} satisfies ChartConfig;

const attendanceConfig = attendanceBreakdown.reduce<ChartConfig>((config, item) => {
  config[item.label] = { label: item.label, color: item.color };
  return config;
}, {});

interface ProgressChartsProps {
  range: number;
  onRangeChange: (range: number) => void;
}

export const ProgressCharts = ({ range, onRangeChange }: ProgressChartsProps) => {
  const visibleTrend = performanceTrend.slice(-range);

  return (
    <div className='grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,0.8fr)]'>
      <Card>
        <CardHeader className='gap-4 sm:grid-cols-[1fr_auto]'>
          <div className='flex flex-col gap-1.5'>
            <CardTitle>Performance trend</CardTitle>
            <CardDescription>Score progression compared with the class average</CardDescription>
          </div>
          <div aria-label='Chart date range' className='bg-muted flex w-fit rounded-lg p-1'>
            {[3, 6].map((value) => (
              <Button
                key={value}
                aria-pressed={range === value}
                className='shadow-none'
                size='sm'
                variant={range === value ? 'default' : 'ghost'}
                onClick={() => onRangeChange(value)}
              >
                {value} months
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer className='aspect-auto h-[290px] w-full' config={performanceConfig}>
            <LineChart data={visibleTrend} margin={{ left: -14, right: 16, top: 12 }}>
              <XAxis axisLine={false} dataKey='period' tickLine={false} tickMargin={10} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                width={48}
                domain={[50, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent indicator='line' />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey='student'
                type='monotone'
                activeDot={{ r: 5 }}
                dot={{ fill: 'var(--color-student)', r: 3 }}
                stroke='var(--color-student)'
                strokeWidth={3}
              />
              <Line
                dataKey='classAverage'
                type='monotone'
                dot={false}
                stroke='var(--color-classAverage)'
                strokeDasharray='5 5'
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance overview</CardTitle>
          <CardDescription>50 scheduled classes this term</CardDescription>
        </CardHeader>
        <CardContent className='grid items-center gap-4 sm:grid-cols-[180px_1fr] xl:grid-cols-1'>
          <div className='relative mx-auto'>
            <ChartContainer className='size-[180px]' config={attendanceConfig}>
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel nameKey='label' />} />
                <Pie
                  data={attendanceBreakdown}
                  dataKey='value'
                  innerRadius={58}
                  nameKey='label'
                  paddingAngle={2}
                  outerRadius={82}
                  strokeWidth={0}
                >
                  {attendanceBreakdown.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className='pointer-events-none absolute inset-0 grid place-content-center text-center'>
              <strong className='text-3xl'>94%</strong>
              <span className='text-muted-foreground text-xs'>Present</span>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            {attendanceBreakdown.map((item) => (
              <div key={item.label} className='flex items-center gap-3 text-sm'>
                <span className='size-2.5 rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-muted-foreground flex-1'>{item.label}</span>
                <span className='font-medium'>{item.value}</span>
                <span className='text-muted-foreground w-10 text-right'>{item.percentage}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
