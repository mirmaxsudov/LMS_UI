import { useLingui } from '@lingui/react/macro';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import {
  onlineCourseEnrollmentStatusLabelMap,
  onlineCourseStatusColorMap
} from '@/modules/online-course/constants';
import {
  getOnlineCourseEnrollmentsQueryOptions,
  ONLINE_COURSE_ENROLLMENT_QUERY_KEYS
} from '@/modules/online-course/options';
import { postOnlineCourseEnrollment } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Progress } from '@/shared/ui/progress';
import { Skeleton } from '@/shared/ui/skeleton';

import { OnlineCourseBadge } from '../OnlineCourseBadge';

interface OnlineCourseEnrollmentsDialogProps {
  course: OnlineCoursePreview | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OnlineCourseEnrollmentsDialog = ({
  course,
  open,
  onOpenChange
}: OnlineCourseEnrollmentsDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const [studentProfileId, setStudentProfileId] = useState('');

  const enrollmentsQuery = useQuery({
    ...getOnlineCourseEnrollmentsQueryOptions({
      filters: {
        courseId: course?.id
      },
      page: 1,
      size: 20
    }),
    enabled: open && Boolean(course?.id)
  });

  const enrollMutation = useMutation({
    mutationFn: postOnlineCourseEnrollment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.all()
      });
      setStudentProfileId('');
    }
  });

  const enrollments = enrollmentsQuery.data?.data.results ?? [];

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className='max-h-[90svh] overflow-y-auto sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{t`Enrollments`}</DialogTitle>
          <DialogDescription>{course?.title ?? t`Online course enrollments`}</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4'>
          <div className='flex gap-2'>
            <Input
              value={studentProfileId}
              onChange={(event) => setStudentProfileId(event.target.value)}
              placeholder={t`Student profile ID`}
            />
            <Button
              disabled={!course || !studentProfileId.trim()}
              type='button'
              loading={enrollMutation.isPending}
              onClick={() => {
                if (!course) return;
                enrollMutation.mutate({
                  courseId: course.id,
                  data: {
                    status: 'ACTIVE',
                    studentProfileId
                  }
                });
              }}
            >
              <PlusIcon />
              {t`Enroll`}
            </Button>
          </div>

          {enrollmentsQuery.isLoading ? (
            <div className='grid gap-2'>
              <Skeleton className='h-20 rounded-lg' />
              <Skeleton className='h-20 rounded-lg' />
            </div>
          ) : (
            <div className='grid gap-2'>
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className='bg-card grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr,180px]'
                >
                  <div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='font-medium'>{enrollment.studentName}</p>
                      <OnlineCourseBadge color={onlineCourseStatusColorMap.PUBLIC}>
                        {t(onlineCourseEnrollmentStatusLabelMap[enrollment.status])}
                      </OnlineCourseBadge>
                    </div>
                    <p className='text-muted-foreground mt-1 text-sm'>
                      {enrollment.completedLessons}/{enrollment.totalLessons} {t`lessons completed`}
                    </p>
                  </div>
                  <div className='grid content-center gap-2'>
                    <Progress value={enrollment.progressPercentage} />
                    <p className='text-muted-foreground text-right text-xs'>
                      {enrollment.progressPercentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
