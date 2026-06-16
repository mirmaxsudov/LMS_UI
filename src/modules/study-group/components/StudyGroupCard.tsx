import { useLingui } from '@lingui/react/macro';
import { CalendarDaysIcon, ClockIcon, LayersIcon, UsersIcon } from 'lucide-react';

import { dayOfWeekLabelMap } from '@/modules/group';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

const chartColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)'
];

const getGroupColor = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return chartColors[hash % chartColors.length];
};

const getInitials = (firstName: string, lastName: string) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

interface StudyGroupCardProps {
  group: StudyGroup;
}

export const StudyGroupCard = ({ group }: StudyGroupCardProps) => {
  const { t } = useLingui();
  const color = getGroupColor(group.id);
  const teacherName = [group.teacher.firstName, group.teacher.middleName, group.teacher.lastName]
    .filter(Boolean)
    .join(' ');
  const extraClassmates = group.classmatesCount - group.classmates.length;
  const schedule = group.schedules[0];

  return (
    <Card className='h-full'>
      <CardHeader>
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
            <CardDescription>{group.course.title}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-muted-foreground line-clamp-2 text-sm'>{group.course.description}</p>

        <div className='flex items-center gap-2'>
          <Avatar>
            {group.teacher.profileImageUrl && <AvatarImage src={group.teacher.profileImageUrl} />}
            <AvatarFallback>{getInitials(group.teacher.firstName, group.teacher.lastName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium'>{teacherName}</p>
            <p className='text-muted-foreground text-xs'>Group teacher</p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-y-2 text-sm'>
          <div className='text-muted-foreground flex items-center gap-2'>
            <CalendarDaysIcon className='size-4 shrink-0' />
            <span>{group.scheduleDays.map((day) => t(dayOfWeekLabelMap[day])).join(', ')}</span>
          </div>
          {schedule && (
            <div className='text-muted-foreground flex items-center gap-2'>
              <ClockIcon className='size-4 shrink-0' />
              <span>
                {schedule.startTime} - {schedule.endTime}
              </span>
            </div>
          )}
          <div className='text-muted-foreground flex items-center gap-2'>
            <UsersIcon className='size-4 shrink-0' />
            <span>{group.classmatesCount} classmates</span>
          </div>
        </div>

        <div className='space-y-1.5'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Syllabus progress</span>
            <span className='font-semibold'>{group.syllabusProgress.percentage}%</span>
          </div>
          <Progress value={group.syllabusProgress.percentage} />
          <p className='text-muted-foreground text-xs'>
            {group.syllabusProgress.completedLessons}/{group.syllabusProgress.totalLessons} lessons
            completed
          </p>
        </div>

        {group.nextLesson && (
          <div className='bg-muted/40 rounded-lg border p-3'>
            <div className='flex items-center justify-between gap-2'>
              <p className='text-muted-foreground text-xs'>Next lesson</p>
              <Badge variant='outline'>
                {new Date(group.nextLesson.startTime).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </Badge>
            </div>
            <p className='text-sm font-medium'>{group.nextLesson.title}</p>
          </div>
        )}

        <div className='flex items-center'>
          {group.classmates.slice(0, 4).map((classmate) => (
            <Avatar key={classmate.studentId} className='border-background -ml-2 size-7 border-2 first:ml-0'>
              {classmate.profileImageUrl && <AvatarImage src={classmate.profileImageUrl} />}
              <AvatarFallback className='text-[10px]'>
                {getInitials(classmate.firstName, classmate.lastName)}
              </AvatarFallback>
            </Avatar>
          ))}
          {extraClassmates > 0 && (
            <span className='text-muted-foreground ml-2 text-xs'>+{extraClassmates} more</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
