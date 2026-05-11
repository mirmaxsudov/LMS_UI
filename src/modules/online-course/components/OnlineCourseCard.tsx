import { useLingui } from '@lingui/react/macro';
import { ClockIcon, Layers3Icon, PencilIcon, TrashIcon, UsersIcon } from 'lucide-react';

import {
  onlineCourseStatusColorMap,
  onlineCourseStatusLabelMap
} from '@/modules/online-course/constants';
import { formatMinutes } from '@/modules/online-course/lib/format';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';

import { OnlineCourseBadge } from './OnlineCourseBadge';

interface OnlineCourseCardProps {
  course: OnlineCoursePreview;
  onDelete: (course: OnlineCoursePreview) => void;
  onEdit: (course: OnlineCoursePreview) => void;
  onManage: (course: OnlineCoursePreview) => void;
  onOpenEnrollments: (course: OnlineCoursePreview) => void;
}

export const OnlineCourseCard = ({
  course,
  onDelete,
  onEdit,
  onManage,
  onOpenEnrollments
}: OnlineCourseCardProps) => {
  const { t } = useLingui();

  return (
    <Card className='group overflow-hidden rounded-lg border-border/80 bg-card/85 p-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md'>
      <div className='bg-muted relative aspect-[16/8] overflow-hidden'>
        {course.thumbnailUrl ? (
          <img
            alt={course.title}
            className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
            src={course.thumbnailUrl}
          />
        ) : (
          <div className='from-primary/20 via-muted to-chart-2/20 grid size-full place-items-center bg-gradient-to-br'>
            <Layers3Icon className='text-primary size-10' />
          </div>
        )}
        <div className='absolute top-3 left-3'>
          <OnlineCourseBadge color={onlineCourseStatusColorMap[course.status]}>
            {t(onlineCourseStatusLabelMap[course.status])}
          </OnlineCourseBadge>
        </div>
      </div>
      <CardContent className='grid gap-4 p-4'>
        <div>
          <button
            className='line-clamp-2 text-left text-lg leading-tight font-semibold tracking-tight hover:text-primary'
            type='button'
            onClick={() => onManage(course)}
          >
            {course.title}
          </button>
          <p className='text-muted-foreground mt-2 line-clamp-2 text-sm'>
            {course.shortDescription}
          </p>
        </div>
        <div className='text-muted-foreground flex flex-wrap items-center gap-3 text-sm'>
          <span className='inline-flex items-center gap-1.5'>
            <ClockIcon className='size-4' />
            {formatMinutes(course.estimatedDurationInMinutes)}
          </span>
          <span className='inline-flex items-center gap-1.5'>
            <Layers3Icon className='size-4' />
            {course.level}
          </span>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <Button size='sm' type='button' variant='outline' onClick={() => onManage(course)}>
            {t`Manage`}
          </Button>
          <div className='flex items-center gap-2'>
            <Button
              size='icon-sm'
              type='button'
              variant='ghost'
              onClick={() => onOpenEnrollments(course)}
            >
              <UsersIcon className='size-4' />
            </Button>
            <Button size='icon-sm' type='button' variant='outline' onClick={() => onEdit(course)}>
              <PencilIcon className='size-4' />
            </Button>
            <Button
              size='icon-sm'
              type='button'
              variant='destructive'
              onClick={() => onDelete(course)}
            >
              <TrashIcon className='size-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
