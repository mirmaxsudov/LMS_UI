import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { endOfMonth, startOfMonth } from 'date-fns';
import { useMemo } from 'react';

import {
  CalendarProvider,
  CalendarToolbar,
  EventGap,
  EventHeight,
  MonthView,
  useCalendarContext,
  WeekCellsHeight
} from '@/modules/event-calendar';
import { getLessonSessionsQueryOptions } from '@/modules/lesson-session';
import { formatDateToString } from '@/shared/lib/format';
import { PageContent } from '@/shared/ui/page';

const ParentCalendarView = () => {
  const { currentDate, setCurrentDate } = useCalendarContext();

  const from = formatDateToString(startOfMonth(currentDate));
  const to = formatDateToString(endOfMonth(currentDate));

  const lessonSessionsQuery = useQuery(
    getLessonSessionsQueryOptions({
      filters: { from, to },
      size: 1000
    })
  );

  const events = useMemo<CalendarEvent[]>(() => {
    const sessions = lessonSessionsQuery.data?.data.results ?? [];

    return sessions.map((session) => ({
      id: session.id,
      title: session.lessonTitle,
      description: session.groupName,
      date: session.startTime,
      start_time: session.startTime.slice(11, 16),
      end_time: session.endTime.slice(11, 16)
    }));
  }, [lessonSessionsQuery.data]);

  return (
    <div
      style={
        {
          '--event-height': `${EventHeight}px`,
          '--event-gap': `${EventGap}px`,
          '--week-cells-height': `${WeekCellsHeight}px`
        } as React.CSSProperties
      }
      className='flex flex-col rounded-lg has-data-[slot=month-view]:flex-1'
    >
      <PageContent className='gap-4'>
        <CalendarToolbar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <MonthView currentDate={currentDate} events={events} />
      </PageContent>
    </div>
  );
};

const ParentCalendarRoutePage = () => (
  <CalendarProvider>
    <ParentCalendarView />
  </CalendarProvider>
);

export const Route = createFileRoute('/_authenticated/parent/calendar/')({
  component: ParentCalendarRoutePage
});
