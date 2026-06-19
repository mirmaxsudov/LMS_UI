import { useLingui } from '@lingui/react/macro';
import { ArrowRightIcon, CalendarDaysIcon, ClockIcon, LayersIcon, MapPinIcon, UsersIcon } from 'lucide-react';

import { dayOfWeekLabelMap, groupStatusColorMap, groupStatusLabelMap } from '@/modules/group';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import { courseLevelLabelMap } from '../constants';
import { formatDateTime, getGroupColor, getRoomName, getScheduleTimeRange } from '../lib/format';
import { StatusPill } from './StatusPill';

interface TeacherGroupCardProps {
  group: TeacherGroup;
  onView: (group: TeacherGroup) => void;
}

export const TeacherGroupCard = ({ group, onView }: TeacherGroupCardProps) => {
  const { t } = useLingui();
  const color = getGroupColor(group.id);
  const scheduleDays = group.scheduleDays.map((day) => t(dayOfWeekLabelMap[day])).join(', ');

  return (
    <Card className='flex h-full flex-col'>
      <CardHeader>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <div
              style={{
                backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                color
              }}
              className='flex size-10 shrink-0 items-center justify-center rounded-lg'
            >
              <LayersIcon className='size-5' />
            </div>
            <div className='min-w-0'>
              <CardTitle className='truncate'>{group.groupName}</CardTitle>
              <CardDescription className='truncate'>{group.course.title}</CardDescription>
            </div>
          </div>
          <StatusPill label={t(groupStatusLabelMap[group.status])} color={groupStatusColorMap[group.status]} />
        </div>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col gap-4'>
        <Badge className='w-fit' variant='secondary'>
          {t(courseLevelLabelMap[group.course.level])}
        </Badge>

        <div className='grid grid-cols-2 gap-y-2 text-sm'>
          <div className='text-muted-foreground flex items-center gap-2'>
            <CalendarDaysIcon className='size-4 shrink-0' />
            <span className='truncate'>{scheduleDays}</span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2'>
            <ClockIcon className='size-4 shrink-0' />
            <span>{getScheduleTimeRange(group)}</span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2'>
            <UsersIcon className='size-4 shrink-0' />
            <span>
              {group.currentStudents}/{group.capacity} students
            </span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2'>
            <MapPinIcon className='size-4 shrink-0' />
            <span className='truncate'>{getRoomName(group)}</span>
          </div>
        </div>

        <div className='space-y-1.5'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Syllabus progress</span>
            <span className='font-semibold'>{group.syllabusProgress.percentage}%</span>
          </div>
          <Progress value={group.syllabusProgress.percentage} />
          <p className='text-muted-foreground text-xs'>
            {group.syllabusProgress.completedLessons}/{group.syllabusProgress.totalLessons} lessons completed
          </p>
        </div>

        {group.nextLesson && (
          <div className='bg-muted/40 flex items-center justify-between gap-2 rounded-lg border p-3'>
            <p className='text-muted-foreground text-xs'>Next lesson</p>
            <Badge variant='outline'>{formatDateTime(group.nextLesson.startTime)}</Badge>
          </div>
        )}

        <Button className='mt-auto w-full' variant='outline' onClick={() => onView(group)}>
          View students
          <ArrowRightIcon />
        </Button>
      </CardContent>
    </Card>
  );
};
