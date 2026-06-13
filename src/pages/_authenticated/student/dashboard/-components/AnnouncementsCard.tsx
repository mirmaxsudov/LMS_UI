import { AlertTriangleIcon, InfoIcon, MegaphoneIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import { announcements } from './mock-data';
import type { AnnouncementPriority } from './types';

const priorityIcon: Record<AnnouncementPriority, typeof InfoIcon> = {
  normal: InfoIcon,
  important: MegaphoneIcon,
  urgent: AlertTriangleIcon
};

const priorityColor: Record<AnnouncementPriority, string> = {
  normal: 'bg-primary/10 text-primary',
  important: 'bg-chart-3/15 text-chart-3',
  urgent: 'bg-destructive/10 text-destructive'
};

export const AnnouncementsCard = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
        <CardDescription>Latest news from your learning center</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {announcements.map((announcement) => {
          const Icon = priorityIcon[announcement.priority];

          return (
            <div key={announcement.id} className='flex gap-3'>
              <div
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-lg',
                  priorityColor[announcement.priority]
                )}
              >
                <Icon className='size-4' />
              </div>
              <div className='space-y-0.5'>
                <p className='text-sm font-medium'>{announcement.title}</p>
                <p className='text-muted-foreground line-clamp-2 text-xs'>
                  {announcement.description}
                </p>
                <p className='text-muted-foreground text-xs'>
                  {announcement.author} ·{' '}
                  {new Date(announcement.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
