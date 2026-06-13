import { AlertTriangleIcon, InfoIcon, MegaphoneIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import type { NotificationType } from './types';

import { notifications } from './mock-data';

const typeIcon: Record<NotificationType, typeof InfoIcon> = {
  info: InfoIcon,
  reminder: MegaphoneIcon,
  alert: AlertTriangleIcon
};

const typeColor: Record<NotificationType, string> = {
  info: 'bg-primary/10 text-primary',
  reminder: 'bg-chart-3/15 text-chart-3',
  alert: 'bg-destructive/10 text-destructive'
};

export const NotificationsCard = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Updates and reminders for your classes</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {notifications.map((notification) => {
          const Icon = typeIcon[notification.type];

          return (
            <div key={notification.id} className='flex gap-3'>
              <div
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-lg',
                  typeColor[notification.type]
                )}
              >
                <Icon className='size-4' />
              </div>
              <div className='space-y-0.5'>
                <p className='text-sm font-medium'>{notification.title}</p>
                <p className='text-muted-foreground line-clamp-2 text-xs'>
                  {notification.description}
                </p>
                <p className='text-muted-foreground text-xs'>
                  {new Date(notification.date).toLocaleDateString('en-US', {
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
