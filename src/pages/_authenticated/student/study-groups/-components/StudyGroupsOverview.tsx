import type { LucideIcon } from 'lucide-react';

import { CalendarDaysIcon, LayersIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

import { Card, CardContent } from '@/shared/ui/card';

import { studyGroupsOverview } from './mock-data';

interface OverviewStatProps {
  description: string;
  icon: LucideIcon;
  title: string;
  value: string;
}

const OverviewStat = ({ title, value, description, icon: Icon }: OverviewStatProps) => (
  <Card>
    <CardContent className='flex items-start justify-between gap-4'>
      <div className='space-y-1'>
        <p className='text-muted-foreground text-sm'>{title}</p>
        <p className='text-2xl font-semibold'>{value}</p>
        <p className='text-muted-foreground text-xs'>{description}</p>
      </div>
      <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg'>
        <Icon className='size-5' />
      </div>
    </CardContent>
  </Card>
);

export const StudyGroupsOverview = () => {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <OverviewStat
        title='My groups'
        value={`${studyGroupsOverview.totalGroups}`}
        description='Active this term'
        icon={LayersIcon}
      />
      <OverviewStat
        title='Classmates'
        value={`${studyGroupsOverview.totalClassmates}`}
        description='Across all your groups'
        icon={UsersIcon}
      />
      <OverviewStat
        title='Weekly sessions'
        value={`${studyGroupsOverview.sessionsThisWeek}`}
        description='Group sessions this week'
        icon={CalendarDaysIcon}
      />
      <OverviewStat
        title='Average progress'
        value={`${studyGroupsOverview.averageProgress}%`}
        description='Syllabus completed on average'
        icon={TrendingUpIcon}
      />
    </div>
  );
};
