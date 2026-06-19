import type { LucideIcon } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { CalendarClockIcon, EyeIcon, MegaphoneIcon, PinIcon } from 'lucide-react';

import { getAnnouncementOverviewQueryOptions } from '@/modules/announcement/options';
import { Card, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

interface OverviewStatProps {
  description: string;
  icon: LucideIcon;
  isLoading: boolean;
  title: string;
  value: string;
}

const OverviewStat = ({ title, value, description, icon: Icon, isLoading }: OverviewStatProps) => (
  <Card>
    <CardContent className='flex items-start justify-between gap-4'>
      <div className='space-y-1'>
        <p className='text-muted-foreground text-sm'>{title}</p>
        {isLoading ? (
          <Skeleton className='h-8 w-16' />
        ) : (
          <p className='text-2xl font-semibold'>{value}</p>
        )}
        <p className='text-muted-foreground text-xs'>{description}</p>
      </div>
      <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg'>
        <Icon className='size-5' />
      </div>
    </CardContent>
  </Card>
);

export const AnnouncementsOverview = () => {
  const { data, isLoading } = useQuery(getAnnouncementOverviewQueryOptions());
  const overview = data?.data;

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <OverviewStat
        title='Published'
        value={`${overview?.published ?? 0}`}
        description='Live across the platform'
        icon={MegaphoneIcon}
        isLoading={isLoading}
      />
      <OverviewStat
        title='Scheduled'
        value={`${overview?.scheduled ?? 0}`}
        description='Queued to go out later'
        icon={CalendarClockIcon}
        isLoading={isLoading}
      />
      <OverviewStat
        title='Pinned'
        value={`${overview?.pinned ?? 0}`}
        description='Highlighted at the top'
        icon={PinIcon}
        isLoading={isLoading}
      />
      <OverviewStat
        title='Total reach'
        value={(overview?.totalReach ?? 0).toLocaleString()}
        description='Views on published posts'
        icon={EyeIcon}
        isLoading={isLoading}
      />
    </div>
  );
};
