import { useLingui } from '@lingui/react/macro';
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import { useMemo, useState } from 'react';

import { EventItem, getAllListForDay, sort } from '@/modules/event-calendar';
import { formatLocaleDate } from '@/shared/lib/format';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/shared/ui/sheet';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

export const MonthView = ({ currentDate, events }: MonthViewProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);

  const { t } = useLingui();

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  const weekdays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i);
      return format(date, 'EEE');
    });
  }, []);

  const weeks = useMemo(() => {
    const result: Date[][] = [];
    let week: Date[] = [];

    for (let i = 0; i < days.length; i++) {
      week.push(days[i]);
      if (week.length === 7 || i === days.length - 1) {
        result.push(week);
        week = [];
      }
    }

    return result;
  }, [days]);

  const handleOpenDay = (day: Date) => {
    setSelectedDate(day);
    setOpen(true);
  };

  const dayEvents = useMemo(
    () =>
      sort(
        getAllListForDay(events, selectedDate, (item) => item.date),
        (a, b) => {
          const aStart = a.start_time || '00:00';
          const bStart = b.start_time || '00:00';
          return aStart.localeCompare(bStart);
        }
      ),
    [events, selectedDate]
  );

  return (
    <div className='contents' data-slot='month-view'>
      <div className='border-border/70 grid grid-cols-7 border-b uppercase'>
        {weekdays.map((day) => (
          <div key={day} className='text-muted-foreground/70 py-2 text-center text-xs'>
            {day}
          </div>
        ))}
      </div>
      <div className='grid flex-1 auto-rows-fr'>
        {weeks.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className='grid grid-cols-7 [&:last-child>*]:border-b-0'>
            {week.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentDate);
              const allEvents = sort(
                getAllListForDay(events, day, (item) => item.date),
                (a, b) => {
                  const aStart = a.start_time || '00:00';
                  const bStart = b.start_time || '00:00';
                  return aStart.localeCompare(bStart);
                }
              );

              const isCurrentDay: boolean = isToday(day);

              return (
                <div
                  key={day.toString()}
                  className='group border-border/70 data-outside-cell:bg-muted/25 data-outside-cell:text-muted-foreground/70 border-r border-b p-1 last:border-r-0'
                  data-outside-cell={!isCurrentMonth || undefined}
                  data-today={isCurrentDay || undefined}
                >
                  <div className='flex items-center justify-between'>
                    <div className='group-data-today:bg-primary group-data-today:text-primary-foreground mt-1 inline-flex size-6 items-center justify-center rounded-full text-sm'>
                      {format(day, 'd')}
                    </div>
                  </div>
                  <div
                    className='min-h-[calc((var(--event-height)+var(--event-gap))*2)] cursor-pointer space-y-2 py-1 sm:min-h-[calc((var(--event-height)+var(--event-gap))*3)] lg:min-h-[calc((var(--event-height)+var(--event-gap))*4)]'
                    onClick={() => handleOpenDay(day)}
                  >
                    {allEvents.length > 0 && (
                      <div className='flex items-center justify-between rounded-lg bg-[#43A04720] px-2 py-1 font-semibold text-[#43A047] transition-colors duration-300 hover:bg-[#43A04730]'>
                        <p className='text-sm'>{t`Events`}</p>
                        <span>{allEvents.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetContent className='sm:max-w-md'>
          <SheetHeader>
            <SheetTitle>
              {t`Events`} - {formatLocaleDate(selectedDate, 'PP')}
            </SheetTitle>
          </SheetHeader>
          <div className='flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4'>
            {dayEvents.length > 0 ? (
              dayEvents.map((event, i) => (
                <EventItem key={event.id} event={event} index={i + 1} />
              ))
            ) : (
              <div className='flex flex-1 items-center justify-center text-sm text-muted-foreground'>
                {t`No results.`}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
