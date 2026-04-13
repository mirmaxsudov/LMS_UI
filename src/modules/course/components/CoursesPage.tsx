import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import { useCourseColumns } from '@/modules/course/columns';
import { CourseForm } from '@/modules/course/components/CourseForm';
import { coursesFiltersConfig, mapCoursesFiltersToParams } from '@/modules/course/filters';
import { COURSE_QUERY_KEYS } from '@/modules/course/options';
import { deleteCourse, getAllCourses, getCourseById, postCourse, putCourse } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';
import { PageContent } from '@/shared/ui/page';

export const CoursesPage = () => {
  const { t } = useLingui();
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filterValues = useUrlFilterValues(coursesFiltersConfig);

  const requestParams = useMemo(
    () => ({
      ...mapCoursesFiltersToParams(filterValues),
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    }),
    [filterValues, pagination.pageIndex, pagination.pageSize]
  );

  const coursesQuery = useQuery({
    queryKey: COURSE_QUERY_KEYS.all({ params: requestParams }),
    queryFn: () => getAllCourses({ params: requestParams })
  });

  const editCourseQuery = useQuery({
    queryKey: COURSE_QUERY_KEYS.byId(editingId ?? undefined),
    queryFn: () => getCourseById({ id: editingId as string }),
    enabled: Boolean(isFormOpen && editingId)
  });

  const createMutation = useMutation({
    mutationFn: postCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['courses', 'list'] });
      setIsFormOpen(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: putCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['courses', 'list'] });
      if (editingId) {
        await queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEYS.byId(editingId) });
      }
      setIsFormOpen(false);
      setEditingId(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['courses', 'list'] });
    }
  });

  const columns = useCourseColumns({
    deletingId: deleteMutation.variables?.id,
    onEdit: (id) => {
      setEditingId(id);
      setIsFormOpen(true);
    },
    onDelete: (id) => {
      deleteMutation.mutate({ id });
    }
  });

  const courses = coursesQuery.data?.data.results ?? [];
  const total = coursesQuery.data?.data.total ?? 0;
  const isEditMode = Boolean(editingId);
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <PageContent filtersConfig={coursesFiltersConfig}>
      <div className='space-y-3'>
        <div className='flex justify-end'>
          <Button
            onClick={() => {
              setEditingId(null);
              setIsFormOpen(true);
            }}
          >
            {t`Create course`}
          </Button>
        </div>
        <UserListingTable
          columns={columns}
          data={courses}
          isLoading={coursesQuery.isLoading}
          onPaginationChange={setPagination}
          pagination={pagination}
          total={total}
        />
      </div>

      <Dialog
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) {
            setEditingId(null);
          }
        }}
        open={isFormOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? t`Edit course` : t`Create course`}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? t`Update the selected course details.`
                : t`Fill out the form to create a new course.`}
            </DialogDescription>
          </DialogHeader>

          {isEditMode && editCourseQuery.isLoading ? (
            <div className='text-muted-foreground text-sm'>{t`Loading...`}</div>
          ) : (
            <CourseForm
              defaultValues={editCourseQuery.data?.data}
              isSubmitting={isSubmitting}
              submitLabel={isEditMode ? t`Update` : t`Create`}
              onSubmit={(data) => {
                if (isEditMode && editingId) {
                  updateMutation.mutate({ id: editingId, data });
                  return;
                }
                createMutation.mutate({ data });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageContent>
  );
};
