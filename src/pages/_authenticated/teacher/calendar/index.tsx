import { createFileRoute } from '@tanstack/react-router';
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
import { PageContent } from '@/shared/ui/page';

const TeacherCalendarView = () => {
  const { currentDate, setCurrentDate } = useCalendarContext();

  const events = useMemo<CalendarEvent[]>(() => {
    const sessions = [] as LessonSession[];

    return sessions.map((session) => ({
      id: session.id,
      title: session.lessonTitle,
      description: session.groupName,
      date: session.startTime,
      start_time: session.startTime.slice(11, 16),
      end_time: session.endTime.slice(11, 16)
    }));
  }, []);

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

const TeacherCalendarRoutePage = () => (
  <CalendarProvider>
    <TeacherCalendarView />
  </CalendarProvider>
);

export const Route = createFileRoute('/_authenticated/teacher/calendar/')({
  component: TeacherCalendarRoutePage
});
