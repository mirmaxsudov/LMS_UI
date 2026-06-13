import { UsersIcon } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
} from '@/shared/ui/timeline';

import type { ScheduleStatus } from './types';

import { todaySchedule } from './mock-data';

const statusLabel: Record<ScheduleStatus, string> = {
  completed: 'Completed',
  ongoing: 'In progress',
  upcoming: 'Upcoming'
};

const statusVariant: Record<ScheduleStatus, 'default' | 'outline' | 'secondary'> = {
  completed: 'secondary',
  ongoing: 'default',
  upcoming: 'outline'
};

export const TodayScheduleCard = () => {
  const completedCount = todaySchedule.filter((item) => item.status === 'completed').length;
  const activeStep = todaySchedule.findIndex((item) => item.status !== 'completed') + 1;

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Today&#39;s schedule</CardTitle>
        <CardDescription>
          {completedCount} of {todaySchedule.length} lessons completed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Timeline value={activeStep || todaySchedule.length}>
          {todaySchedule.map((item, index) => (
            <TimelineItem key={item.id} step={index + 1}>
              <TimelineHeader>
                <TimelineDate>
                  {item.startTime} - {item.endTime}
                </TimelineDate>
                <TimelineTitle>{item.groupName}</TimelineTitle>
                <TimelineIndicator
                  className='bg-background'
                  style={{ borderColor: item.color }}
                />
              </TimelineHeader>
              <TimelineContent>
                <p>{item.topic}</p>
                <div className='mt-1 flex items-center justify-between gap-2'>
                  <span className='text-muted-foreground flex items-center gap-1 text-xs'>
                    {item.room} ·
                    <UsersIcon className='size-3' />
                    {item.studentsCount}
                  </span>
                  <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge>
                </div>
              </TimelineContent>
              <TimelineSeparator />
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};
