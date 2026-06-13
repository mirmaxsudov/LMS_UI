import type { LucideIcon } from 'lucide-react';

import { BookOpenIcon, CheckCircle2Icon, LayersIcon, TrendingUpIcon } from 'lucide-react';

import { Card, CardContent } from '@/shared/ui/card';

import { coursesOverviewStat } from './mock-data';

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

export const CoursesOverview = () => {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <OverviewStat
        title='Enrolled courses'
        value={`${coursesOverviewStat.totalCourses}`}
        description='This term'
        icon={LayersIcon}
      />
      <OverviewStat
        title='Active courses'
        value={`${coursesOverviewStat.activeCourses}`}
        description='Currently in progress'
        icon={BookOpenIcon}
      />
      <OverviewStat
        title='Completed'
        value={`${coursesOverviewStat.completedCourses}`}
        description='Finished courses'
        icon={CheckCircle2Icon}
      />
      <OverviewStat
        title='Average progress'
        value={`${coursesOverviewStat.averageProgress}%`}
        description='Across all courses'
        icon={TrendingUpIcon}
      />
    </div>
  );
};
