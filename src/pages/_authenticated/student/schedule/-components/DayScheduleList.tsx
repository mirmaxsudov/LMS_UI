import { CalendarOffIcon } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import { ScheduleClassCard } from './ScheduleClassCard';
import { getDayDurationHours } from './utils';

interface DayScheduleListProps {
  day: StudentScheduleDay;
}

export const DayScheduleList = ({ day }: DayScheduleListProps) => {
  const hasClasses = day.classes.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <CardTitle>{day.label}</CardTitle>
          {day.isToday && <Badge>Today</Badge>}
        </div>
        <CardDescription>
          {hasClasses
            ? `${day.classes.length} classes · ${getDayDurationHours(day)} hours`
            : 'No classes scheduled'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasClasses ? (
          <div className='flex flex-col gap-3'>
            {day.classes.map((item) => (
              <ScheduleClassCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-12 text-center'>
            <div className='bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full'>
              <CalendarOffIcon className='size-6' />
            </div>
            <div className='space-y-1'>
              <p className='font-medium'>Nothing scheduled</p>
              <p className='text-muted-foreground text-sm'>Enjoy your free day — no classes here.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
