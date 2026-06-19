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

interface TeacherGroupsOverviewProps {
  overview: TeacherGroupOverview;
}

export const TeacherGroupsOverview = ({ overview }: TeacherGroupsOverviewProps) => (
  <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
    <OverviewStat
      title='My groups'
      value={`${overview.totalGroups}`}
      description='Groups you teach'
      icon={LayersIcon}
    />
    <OverviewStat
      title='Students'
      value={`${overview.totalStudents}`}
      description='Across all your groups'
      icon={UsersIcon}
    />
    <OverviewStat
      title='Weekly sessions'
      value={`${overview.sessionsThisWeek}`}
      description='Across active groups'
      icon={CalendarDaysIcon}
    />
    <OverviewStat
      title='Active groups'
      value={`${overview.activeGroups}`}
      description='Currently running'
      icon={TrendingUpIcon}
    />
  </div>
);
