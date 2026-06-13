import { Link } from '@tanstack/react-router';
import { AlertTriangleIcon, ArrowRightIcon, InfoIcon, MegaphoneIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';

import type { AnnouncementPriority } from './types';

import { announcements } from './mock-data';

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
    <Card className='flex h-full flex-col'>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
        <CardDescription>Latest news from your learning center</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 space-y-4'>
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
      <CardFooter>
        <Button asChild className='w-full' variant='outline'>
          <Link to='/parent/notifications'>
            View all announcements
            <ArrowRightIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
