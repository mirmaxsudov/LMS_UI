import type { LucideIcon } from 'lucide-react';

import { Link } from '@tanstack/react-router';
import {
  AtomIcon,
  CalculatorIcon,
  CalendarDaysIcon,
  ClockIcon,
  Code2Icon,
  FolderIcon,
  GlobeIcon,
  MapPinIcon,
  PlayCircleIcon,
  UsersIcon
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import type { StudentCourse } from './types';

const subjectIcon: Record<string, LucideIcon> = {
  Mathematics: CalculatorIcon,
  'English Language': GlobeIcon,
  Physics: AtomIcon,
  'Computer Science': Code2Icon,
  'World History': GlobeIcon,
  Biology: AtomIcon
};

const levelLabel: Record<CourseLevel, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced'
};

const statusConfig: Record<StudentCourse['status'], { label: string; variant: 'default' | 'outline' | 'secondary' }> = {
  active: { label: 'In progress', variant: 'default' },
  completed: { label: 'Completed', variant: 'secondary' },
  upcoming: { label: 'Upcoming', variant: 'outline' }
};

interface CourseCardProps {
  course: StudentCourse;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const Icon = subjectIcon[course.title] ?? CalculatorIcon;
  const status = statusConfig[course.status];

  return (
    <Card className='h-full'>
      <CardHeader>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <div
              style={{
                backgroundColor: `color-mix(in srgb, ${course.color} 15%, transparent)`,
                color: course.color
              }}
              className='flex size-10 shrink-0 items-center justify-center rounded-lg'
            >
              <Icon className='size-5' />
            </div>
            <div className='min-w-0'>
              <CardTitle className='truncate'>{course.title}</CardTitle>
              <CardDescription>{course.groupName}</CardDescription>
            </div>
          </div>
          <div className='flex shrink-0 flex-col items-end gap-1'>
            <Badge variant={status.variant}>{status.label}</Badge>
            <Badge variant='outline'>{levelLabel[course.level]}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-muted-foreground line-clamp-2 text-sm'>{course.description}</p>

        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarFallback>{course.teacher.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium'>{course.teacher.name}</p>
            <p className='text-muted-foreground text-xs'>Course teacher</p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-y-2 text-sm'>
          <div className='text-muted-foreground flex items-center gap-2'>
            <CalendarDaysIcon className='size-4 shrink-0' />
            <span>{course.schedule.days.join(', ')}</span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2'>
            <ClockIcon className='size-4 shrink-0' />
            <span>
              {course.schedule.startTime} - {course.schedule.endTime}
            </span>
          </div>
          {course.schedule.room && (
            <div className='text-muted-foreground flex items-center gap-2'>
              <MapPinIcon className='size-4 shrink-0' />
              <span>{course.schedule.room}</span>
            </div>
          )}
          <div className='text-muted-foreground flex items-center gap-2'>
            <UsersIcon className='size-4 shrink-0' />
            <span>{course.classmatesCount} classmates</span>
          </div>
        </div>

        <div className='space-y-1.5'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Course progress</span>
            <span className='font-semibold'>{course.progress}%</span>
          </div>
          <Progress value={course.progress} />
          <p className='text-muted-foreground text-xs'>
            {course.completedLessons}/{course.totalLessons} lessons completed
          </p>
        </div>

        {course.nextLesson && (
          <div className='bg-muted/40 rounded-lg border p-3'>
            <div className='flex items-center justify-between gap-2'>
              <p className='text-muted-foreground text-xs'>Next lesson</p>
              <Badge variant='outline'>
                {new Date(course.nextLesson.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </Badge>
            </div>
            <p className='text-sm font-medium'>{course.nextLesson.title}</p>
          </div>
        )}

        <div className='flex items-center justify-end gap-2'>
          <Button asChild size='sm' variant='outline'>
            <Link to='/student/materials'>
              <FolderIcon />
              Materials
            </Link>
          </Button>
          <Button asChild size='sm'>
            <Link to='/student/lessons'>
              <PlayCircleIcon />
              {course.status === 'completed' ? 'Review' : 'Continue'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
