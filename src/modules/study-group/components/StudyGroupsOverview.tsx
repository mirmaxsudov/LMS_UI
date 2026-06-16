import type { LucideIcon } from 'lucide-react';

import { CalendarDaysIcon, LayersIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

import { Card, CardContent } from '@/shared/ui/card';

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

interface StudyGroupsOverviewProps {
  groups: StudyGroup[];
}

export const StudyGroupsOverview = ({ groups }: StudyGroupsOverviewProps) => {
  const totalGroups = groups.length;
  const totalClassmates = groups.reduce((sum, group) => sum + group.classmatesCount, 0);
  const sessionsThisWeek = groups.reduce((sum, group) => sum + group.scheduleDays.length, 0);
  const averageProgress = totalGroups
    ? Math.round(
        groups.reduce((sum, group) => sum + group.syllabusProgress.percentage, 0) / totalGroups
      )
    : 0;

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <OverviewStat
        title='My groups'
        value={`${totalGroups}`}
        description='Active this term'
        icon={LayersIcon}
      />
      <OverviewStat
        title='Classmates'
        value={`${totalClassmates}`}
        description='Across all your groups'
        icon={UsersIcon}
      />
      <OverviewStat
        title='Weekly sessions'
        value={`${sessionsThisWeek}`}
        description='Group sessions this week'
        icon={CalendarDaysIcon}
      />
      <OverviewStat
        title='Average progress'
        value={`${averageProgress}%`}
        description='Syllabus completed on average'
        icon={TrendingUpIcon}
      />
    </div>
  );
};
