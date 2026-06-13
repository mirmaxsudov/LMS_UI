import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import type { SubjectProgress } from './types';

import { subjectProgress } from './mock-data';

const trendIcon: Record<SubjectProgress['trend'], typeof TrendingUpIcon> = {
  up: TrendingUpIcon,
  down: TrendingDownIcon,
  flat: MinusIcon
};

const trendColor: Record<SubjectProgress['trend'], string> = {
  up: 'text-success',
  down: 'text-destructive',
  flat: 'text-muted-foreground'
};

const scoreVariant = (score: number) => {
  if (score >= 90) return 'success';
  if (score >= 75) return 'default';
  return 'destructive';
};

export const SubjectProgressList = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Subject progress</CardTitle>
        <CardDescription>Course completion and average score per subject</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        {subjectProgress.map((subject) => {
          const TrendIcon = trendIcon[subject.trend];
          const completion = Math.round((subject.completedLessons / subject.totalLessons) * 100);

          return (
            <div key={subject.id} className='space-y-2'>
              <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <span
                    className='size-2.5 rounded-full'
                    style={{ backgroundColor: subject.color }}
                  />
                  <div>
                    <p className='text-sm font-medium'>{subject.name}</p>
                    <p className='text-muted-foreground text-xs'>{subject.teacher}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <TrendIcon className={cn('size-4', trendColor[subject.trend])} />
                  <Badge variant={scoreVariant(subject.averageScore)}>
                    {subject.averageScore}%
                  </Badge>
                </div>
              </div>
              <Progress value={completion} />
              <div className='text-muted-foreground flex justify-between text-xs'>
                <span>
                  {subject.completedLessons}/{subject.totalLessons} lessons completed
                </span>
                <span>{subject.attendanceRate}% attendance</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
