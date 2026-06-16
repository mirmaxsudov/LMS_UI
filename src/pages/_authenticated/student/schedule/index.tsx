import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { addDays, addWeeks, startOfWeek, subWeeks } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

import { getStudentScheduleQueryOptions } from '@/modules/student-schedule';
import { formatDateToString } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';
import { Skeleton } from '@/shared/ui/skeleton';

import { DayScheduleList } from './-components/DayScheduleList';
import { DaySelector } from './-components/DaySelector';
import { ScheduleSummaryCards } from './-components/ScheduleSummaryCards';

/** Mon–Sat is one schedule week; the API takes that range as `from`/`to`. */
const getWeekRange = (weekStart: Date) => ({
  from: formatDateToString(weekStart),
  to: formatDateToString(addDays(weekStart, 5))
});

const StudentScheduleRoutePage = () => {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const range = getWeekRange(weekStart);
  const scheduleQuery = useQuery(getStudentScheduleQueryOptions(range));

  const week = scheduleQuery.data?.data.data;
  const days = week?.days ?? [];

  // Keep the user's selection if it's still in the current week, otherwise fall
  // back to today (or the first day) so navigation never lands on a blank panel.
  const selectedDay =
    days.find((day) => day.id === selectedDayId) ?? days.find((day) => day.isToday) ?? days[0];

  const goToWeek = (next: Date) => {
    setWeekStart(next);
    setSelectedDayId(null);
  };

  return (
    <>
      <PageHeader />
      <div className='flex flex-col gap-6 p-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold tracking-tight'>My schedule</h1>
            <p className='text-muted-foreground'>
              Your weekly classes, rooms and timings at a glance.
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <Button size='icon' variant='outline' onClick={() => goToWeek(subWeeks(weekStart, 1))}>
              <ChevronLeftIcon />
              <span className='sr-only'>Previous week</span>
            </Button>
            <Button
              variant='outline'
              onClick={() => goToWeek(startOfWeek(new Date(), { weekStartsOn: 1 }))}
            >
              This week
            </Button>
            <Button size='icon' variant='outline' onClick={() => goToWeek(addWeeks(weekStart, 1))}>
              <ChevronRightIcon />
              <span className='sr-only'>Next week</span>
            </Button>
          </div>
        </div>

        {scheduleQuery.isError && (
          <div className='flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-12 text-center'>
            <p className='font-medium'>Couldn&apos;t load your schedule</p>
            <p className='text-muted-foreground text-sm'>
              Something went wrong while fetching this week.
            </p>
            <Button variant='outline' onClick={() => scheduleQuery.refetch()}>
              Try again
            </Button>
          </div>
        )}

        {scheduleQuery.isPending && (
          <div className='flex flex-col gap-6'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className='h-24 rounded-xl' />
              ))}
            </div>
            <Skeleton className='h-20 rounded-xl' />
            <Skeleton className='h-72 rounded-xl' />
          </div>
        )}

        {week && !scheduleQuery.isError && (
          <>
            <ScheduleSummaryCards summary={week.summary} weekRangeLabel={week.weekRange.label} />

            <DaySelector
              days={days}
              selectedDayId={selectedDay?.id ?? ''}
              onSelect={setSelectedDayId}
            />

            {selectedDay && <DayScheduleList day={selectedDay} />}
          </>
        )}
      </div>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/student/schedule/')({
  component: StudentScheduleRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
