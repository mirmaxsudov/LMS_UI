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

import { skillRatings } from './mock-data';

const chartConfig: ChartConfig = {
  score: { label: 'You', color: 'var(--color-chart-1)' },
  centerAverage: { label: 'Center average', color: 'var(--color-chart-3)' }
};

export const SkillsRadarChart = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Teaching skills review</CardTitle>
        <CardDescription>
          Latest peer and student review scores compared with the center average
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='mx-auto aspect-square h-[300px] w-full' config={chartConfig}>
          <RadarChart data={skillRatings}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='skill' />
            <PolarGrid />
            <Radar
              dataKey='centerAverage'
              fill='var(--color-centerAverage)'
              fillOpacity={0.1}
              stroke='var(--color-centerAverage)'
              strokeDasharray='4 4'
              strokeWidth={2}
            />
            <Radar
              dataKey='score'
              fill='var(--color-score)'
              fillOpacity={0.2}
              stroke='var(--color-score)'
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
