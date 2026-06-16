import {
  BookOpenIcon,
  CheckIcon,
  ClockIcon,
  StarIcon,
  UsersIcon
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';

import type { CatalogCourse } from './types';

const levelLabel: Record<CourseLevel, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced'
};

const compactNumber = (value: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(value);

interface CatalogCourseCardProps {
  course: CatalogCourse;
}

export const CatalogCourseCard = ({ course }: CatalogCourseCardProps) => (
  <Card className='flex h-full flex-col gap-0 overflow-hidden py-0'>
    <div
      style={{
        backgroundImage: `linear-gradient(135deg, ${course.color}, color-mix(in srgb, ${course.color} 55%, #000))`
      }}
      className='relative flex h-24 items-end p-4'
    >
      <div className='absolute top-3 right-3 flex gap-2'>
        {course.isNew && <Badge className='bg-white/90 text-foreground'>New</Badge>}
        <Badge className='bg-white/90 text-foreground' variant='secondary'>
          {course.price === 0 ? 'Free' : `$${course.price}`}
        </Badge>
      </div>
      <span className='text-sm font-medium text-white/90'>{course.category}</span>
    </div>

    <CardContent className='flex flex-1 flex-col gap-3 pt-4'>
      <div className='flex items-start justify-between gap-2'>
        <h3 className='font-semibold leading-tight'>{course.title}</h3>
        <Badge className='shrink-0' variant='outline'>
          {levelLabel[course.level]}
        </Badge>
      </div>

      <p className='text-muted-foreground line-clamp-2 text-sm'>{course.description}</p>

      <div className='flex items-center gap-2'>
        <Avatar className='size-7'>
          <AvatarFallback className='text-xs'>{course.teacher.initials}</AvatarFallback>
        </Avatar>
        <span className='text-sm font-medium'>{course.teacher.name}</span>
      </div>

      <div className='text-muted-foreground mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs'>
        <span className='flex items-center gap-1'>
          <StarIcon className='size-3.5 fill-amber-400 text-amber-400' />
          <span className='text-foreground font-medium'>{course.rating}</span>
          <span>({compactNumber(course.ratingCount)})</span>
        </span>
        <span className='flex items-center gap-1'>
          <BookOpenIcon className='size-3.5' />
          {course.lessons} lessons
        </span>
        <span className='flex items-center gap-1'>
          <ClockIcon className='size-3.5' />
          {course.durationWeeks} weeks
        </span>
        <span className='flex items-center gap-1'>
          <UsersIcon className='size-3.5' />
          {compactNumber(course.studentsCount)}
        </span>
      </div>
    </CardContent>

    <CardFooter className='pb-4'>
      {course.isEnrolled ? (
        <Button disabled className='w-full' variant='secondary'>
          <CheckIcon />
          Enrolled
        </Button>
      ) : (
        <Button className='w-full'>Enroll now</Button>
      )}
    </CardFooter>
  </Card>
);
