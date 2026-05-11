import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BookOpenCheckIcon, PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { useUrlFilterValues } from '@/features';
import {
  mapOnlineCoursesFiltersToParams,
  onlineCoursesFiltersConfig
} from '@/modules/online-course/filters';
import { getOnlineCoursesQueryOptions } from '@/modules/online-course/options';
import { deleteOnlineCourse } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';
import { PageContent } from '@/shared/ui/page';
import { Skeleton } from '@/shared/ui/skeleton';

import { OnlineCourseBuilderSheet } from './OnlineCourseBuilderSheet';
import { OnlineCourseCard } from './OnlineCourseCard';
import { OnlineCourseEnrollmentsDialog } from './OnlineCourseEnrollmentsDialog';
import { OnlineCourseFormDialog } from './OnlineCourseFormDialog';

export const OnlineCoursesPage = () => {
  const { t } = useLingui();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 12 });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<OnlineCoursePreview | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<OnlineCoursePreview | null>(null);
  const [managingCourseId, setManagingCourseId] = useState<string | null>(null);
  const [enrollmentsCourse, setEnrollmentsCourse] = useState<OnlineCoursePreview | null>(null);

  const filterValues = useUrlFilterValues(onlineCoursesFiltersConfig);
  const filters = useMemo(() => mapOnlineCoursesFiltersToParams(filterValues), [filterValues]);

  const onlineCoursesQuery = useQuery(
    getOnlineCoursesQueryOptions({
      filters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const deleteMutation = useMutation({
    mutationFn: deleteOnlineCourse,
    onSuccess: async () => {
      await onlineCoursesQuery.refetch();
      setDeletingCourse(null);
    }
  });

  const courses = onlineCoursesQuery.data?.data.results ?? [];
  const total = onlineCoursesQuery.data?.data.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pagination.pageSize));

  return (
    <PageContent
      actions={
        <div className='mb-5 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2'>
              <div className='bg-primary/10 text-primary grid size-10 place-items-center rounded-md'>
                <BookOpenCheckIcon className='size-5' />
              </div>
              <div>
                <h1 className='text-2xl font-semibold tracking-tight'>{t`Online courses`}</h1>
                <p className='text-muted-foreground text-sm'>
                  {t`Design, publish, and maintain self-paced learning content.`}
                </p>
              </div>
            </div>
          </div>
          <Button
            type='button'
            onClick={() => {
              setEditingCourse(null);
              setIsFormOpen(true);
            }}
          >
            <PlusIcon />
            {t`Create online course`}
          </Button>
        </div>
      }
      filtersConfig={onlineCoursesFiltersConfig}
    >
      {onlineCoursesQuery.isLoading ? (
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className='h-80 rounded-lg' />
          ))}
        </div>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {courses.map((course) => (
            <OnlineCourseCard
              key={course.id}
              course={course}
              onDelete={setDeletingCourse}
              onEdit={(nextCourse) => {
                setEditingCourse(nextCourse);
                setIsFormOpen(true);
              }}
              onManage={(nextCourse) => setManagingCourseId(nextCourse.id)}
              onOpenEnrollments={setEnrollmentsCourse}
            />
          ))}
        </div>
      )}

      <div className='mt-5 flex items-center justify-between gap-3'>
        <p className='text-muted-foreground text-sm'>{t`Total: ${total}`}</p>
        <div className='flex items-center gap-2'>
          <Button
            disabled={pagination.pageIndex === 0}
            size='sm'
            type='button'
            variant='outline'
            onClick={() =>
              setPagination((value) => ({ ...value, pageIndex: Math.max(0, value.pageIndex - 1) }))
            }
          >
            {t`Previous`}
          </Button>
          <span className='text-muted-foreground text-sm'>
            {pagination.pageIndex + 1}/{pageCount}
          </span>
          <Button
            disabled={pagination.pageIndex + 1 >= pageCount}
            size='sm'
            type='button'
            variant='outline'
            onClick={() =>
              setPagination((value) => ({
                ...value,
                pageIndex: Math.min(pageCount - 1, value.pageIndex + 1)
              }))
            }
          >
            {t`Next`}
          </Button>
        </div>
      </div>

      <OnlineCourseFormDialog
        editValues={editingCourse}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingCourse(null);
        }}
        open={isFormOpen}
      />
      <OnlineCourseBuilderSheet
        courseId={managingCourseId}
        onOpenChange={(open) => {
          if (!open) setManagingCourseId(null);
        }}
        open={Boolean(managingCourseId)}
      />
      <OnlineCourseEnrollmentsDialog
        course={enrollmentsCourse}
        onOpenChange={(open) => {
          if (!open) setEnrollmentsCourse(null);
        }}
        open={Boolean(enrollmentsCourse)}
      />
      <DeleteAlertDialog
        itemName={t`online course`}
        isLoading={deleteMutation.isPending}
        onDelete={() => {
          if (deletingCourse) deleteMutation.mutate({ courseId: deletingCourse.id });
        }}
        onOpenChange={(open) => !open && setDeletingCourse(null)}
        open={Boolean(deletingCourse)}
      />
    </PageContent>
  );
};
