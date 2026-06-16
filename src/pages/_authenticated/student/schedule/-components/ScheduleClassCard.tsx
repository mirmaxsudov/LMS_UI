import { ClockIcon, MapPinIcon, UserIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

import type { ClassDisplayStatus } from './types';

import { formatTime, getClassDisplayStatus, getSubjectColor } from './utils';

const statusLabel: Record<ClassDisplayStatus, string> = {
  completed: 'Completed',
  ongoing: 'In progress',
  upcoming: 'Upcoming',
  cancelled: 'Cancelled'
};

const statusVariant: Record<
  ClassDisplayStatus,
  'default' | 'destructive' | 'outline' | 'secondary'
> = {
  completed: 'secondary',
  ongoing: 'default',
  upcoming: 'outline',
  cancelled: 'destructive'
};

interface ScheduleClassCardProps {
  item: StudentScheduleClass;
}

export const ScheduleClassCard = ({ item }: ScheduleClassCardProps) => {
  const status = getClassDisplayStatus(item);
  const color = getSubjectColor(item.subject);
  const startTime = formatTime(item.startTime);
  const endTime = formatTime(item.endTime);

  const location = [item.roomName, item.building].filter(Boolean).join(', ') || 'Online';

  return (
    <div
      className={cn(
        'relative flex gap-4 overflow-hidden rounded-xl border bg-card p-4 transition-colors',
        status === 'ongoing' ? 'ring-2 ring-primary/40' : 'hover:bg-accent/40',
        (status === 'completed' || status === 'cancelled') && 'opacity-70'
      )}
    >
      <span
        aria-hidden
        className='absolute inset-y-0 left-0 w-1.5 rounded-l-xl'
        style={{ backgroundColor: color }}
      />

      <div className='flex w-20 shrink-0 flex-col justify-center pl-2'>
        <span className='text-base font-semibold tabular-nums'>{startTime}</span>
        <span className='text-muted-foreground text-xs tabular-nums'>{endTime}</span>
      </div>

      <div className='min-w-0 flex-1 space-y-1'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <span
              aria-hidden
              className='size-2.5 shrink-0 rounded-full'
              style={{ backgroundColor: color }}
            />
            <h3 className={cn('truncate font-semibold', status === 'cancelled' && 'line-through')}>
              {item.subject}
            </h3>
          </div>
          <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
        </div>

        <p className='text-muted-foreground truncate text-sm'>{item.topic}</p>

        <div className='text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs'>
          <span className='flex items-center gap-1'>
            <UserIcon className='size-3.5' />
            {item.teacherName}
          </span>
          <span className='flex items-center gap-1'>
            <MapPinIcon className='size-3.5' />
            {location}
          </span>
          <span className='flex items-center gap-1'>
            <ClockIcon className='size-3.5' />
            {startTime}–{endTime}
          </span>
        </div>
      </div>
    </div>
  );
};
