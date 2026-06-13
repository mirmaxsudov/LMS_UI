import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import type { CurriculumStatus } from './types';

import { curriculumProgress } from './mock-data';

const statusLabel: Record<CurriculumStatus, string> = {
  ahead: 'Ahead of schedule',
  'on-track': 'On track',
  behind: 'Behind schedule'
};

const statusVariant: Record<CurriculumStatus, 'destructive' | 'secondary' | 'success'> = {
  ahead: 'success',
  'on-track': 'secondary',
  behind: 'destructive'
};

export const CurriculumProgressList = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Curriculum progress</CardTitle>
        <CardDescription>Syllabus completion for each of your groups</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        {curriculumProgress.map((group) => (
          <div key={group.id} className='space-y-2'>
            <div className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <span className='size-2.5 rounded-full' style={{ backgroundColor: group.color }} />
                <div>
                  <p className='text-sm font-medium'>{group.groupName}</p>
                  <p className='text-muted-foreground text-xs'>
                    {group.subject} · {group.topicsCompleted}/{group.totalTopics} topics covered
                  </p>
                </div>
              </div>
              <div className='flex shrink-0 items-center gap-2'>
                <span className='text-sm font-semibold'>{group.progress}%</span>
                <Badge variant={statusVariant[group.status]}>{statusLabel[group.status]}</Badge>
              </div>
            </div>
            <Progress value={group.progress} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
