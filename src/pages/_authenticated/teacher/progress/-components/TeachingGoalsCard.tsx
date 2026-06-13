import { CircleAlertIcon, CircleCheckIcon, CircleDotIcon } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import type { GoalStatus } from './types';

import { teachingGoals } from './mock-data';

const statusLabel: Record<GoalStatus, string> = {
  'on-track': 'On track',
  completed: 'Completed',
  'at-risk': 'At risk'
};

const statusVariant: Record<GoalStatus, 'destructive' | 'secondary' | 'success'> = {
  'on-track': 'secondary',
  completed: 'success',
  'at-risk': 'destructive'
};

const statusIcon: Record<GoalStatus, typeof CircleDotIcon> = {
  'on-track': CircleDotIcon,
  completed: CircleCheckIcon,
  'at-risk': CircleAlertIcon
};

export const TeachingGoalsCard = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Goals for this term</CardTitle>
        <CardDescription>Personal teaching targets you&#39;re working towards</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {teachingGoals.map((goal) => {
          const Icon = statusIcon[goal.status];

          return (
            <div key={goal.id} className='space-y-2 rounded-lg border p-3'>
              <div className='flex items-start justify-between gap-2'>
                <div className='flex items-start gap-2'>
                  <Icon className='text-muted-foreground mt-0.5 size-4 shrink-0' />
                  <div>
                    <p className='text-sm font-medium'>{goal.title}</p>
                    <p className='text-muted-foreground text-xs'>{goal.description}</p>
                  </div>
                </div>
                <Badge className='shrink-0' variant={statusVariant[goal.status]}>
                  {statusLabel[goal.status]}
                </Badge>
              </div>
              <Progress value={goal.progress} />
              <div className='text-muted-foreground flex items-center justify-between text-xs'>
                <span>{goal.progress}% complete</span>
                <span>
                  Due{' '}
                  {new Date(goal.dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
