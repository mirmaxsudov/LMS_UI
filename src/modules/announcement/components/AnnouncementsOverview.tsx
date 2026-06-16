import type { LucideIcon } from 'lucide-react';

import { CalendarClockIcon, EyeIcon, MegaphoneIcon, PinIcon } from 'lucide-react';

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

interface AnnouncementsOverviewProps {
  announcements: Announcement[];
}

export const AnnouncementsOverview = ({ announcements }: AnnouncementsOverviewProps) => {
  const published = announcements.filter((item) => item.status === 'published');
  const scheduled = announcements.filter((item) => item.status === 'scheduled').length;
  const pinned = announcements.filter((item) => item.pinned).length;
  const totalViews = published.reduce((sum, item) => sum + item.viewsCount, 0);

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <OverviewStat
        title='Published'
        value={`${published.length}`}
        description='Live across the platform'
        icon={MegaphoneIcon}
      />
      <OverviewStat
        title='Scheduled'
        value={`${scheduled}`}
        description='Queued to go out later'
        icon={CalendarClockIcon}
      />
      <OverviewStat
        title='Pinned'
        value={`${pinned}`}
        description='Highlighted at the top'
        icon={PinIcon}
      />
      <OverviewStat
        title='Total reach'
        value={totalViews.toLocaleString()}
        description='Views on published posts'
        icon={EyeIcon}
      />
    </div>
  );
};
