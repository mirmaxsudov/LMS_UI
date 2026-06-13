import { formatLocaleDate } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
  event: CalendarEvent;
  index: number;
}

export const EventItem = ({ event, index, className }: Props) => {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-start overflow-hidden rounded-md border p-2 px-1 text-left font-medium backdrop-blur-md select-none',
        'hover:bg-foreground/5 text-sm',
        className
      )}
    >
      <span className='truncate font-normal uppercase sm:text-xs'>
        <span className='font-bold'>{index}</span> - {formatLocaleDate(event.date, 'PP')}
        {event.start_time ? ` ${event.start_time}` : ''}
      </span>
      <span className='max-w-full truncate font-semibold'>{event.title}</span>
      {event.description && (
        <span className='truncate text-[11px]'>{event.description}</span>
      )}
    </div>
  );
};
