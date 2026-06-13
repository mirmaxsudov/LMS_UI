import { Award, BookOpenCheck, CalendarClock, GraduationCap } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
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

import type { ActivityType } from './types';

import { recentActivity } from './mock-data';

const typeIcon: Record<ActivityType, typeof Award> = {
  grade: GraduationCap,
  achievement: Award,
  lesson: BookOpenCheck,
  attendance: CalendarClock
};

const typeColor: Record<ActivityType, string> = {
  grade: 'text-chart-1 border-chart-1',
  achievement: 'text-chart-3 border-chart-3',
  lesson: 'text-chart-2 border-chart-2',
  attendance: 'text-chart-5 border-chart-5'
};

export const ActivityTimelineCard = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>What changed recently</CardDescription>
      </CardHeader>
      <CardContent>
        <Timeline value={recentActivity.length}>
          {recentActivity.map((activity, index) => {
            const Icon = typeIcon[activity.type];

            return (
              <TimelineItem key={activity.id} step={index + 1}>
                <TimelineHeader>
                  <TimelineDate>
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TimelineDate>
                  <TimelineTitle>{activity.title}</TimelineTitle>
                  <TimelineIndicator
                    className={cn(
                      'bg-background flex items-center justify-center',
                      typeColor[activity.type]
                    )}
                  >
                    <Icon className='size-2.5' />
                  </TimelineIndicator>
                </TimelineHeader>
                <TimelineContent>{activity.description}</TimelineContent>
                <TimelineSeparator />
              </TimelineItem>
            );
          })}
        </Timeline>
      </CardContent>
    </Card>
  );
};
