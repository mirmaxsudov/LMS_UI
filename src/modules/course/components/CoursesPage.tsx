import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import { useCourseColumns } from '@/modules/course/columns';
import { CourseFomDialog } from '@/modules/course/components/CourseFomDialog';
import { coursesFiltersConfig, mapCoursesFiltersToParams } from '@/modules/course/filters';
import { getCoursesQueryOptions } from '@/modules/course/options';
import { deleteCourse } from '@/shared/api';
import { Button } from '@/shared/ui/button.tsx';
import { PageContent } from '@/shared/ui/page';

export const CoursesPage = () => {
  const { t } = useLingui();

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filterValues = useUrlFilterValues(coursesFiltersConfig);

  const courseFilters = useMemo(() => mapCoursesFiltersToParams(filterValues), [filterValues]);

  const coursesQuery = useQuery(
    getCoursesQueryOptions({
      filters: courseFilters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: async () => {
      await coursesQuery.refetch();
    }
  });

  const columns = useCourseColumns({
    deletingId: deleteMutation.variables?.id,
    onEdit: (course) => {
      setEditingCourse(course);
      setIsFormOpen(true);
    },
    onDelete: (id) => {
      deleteMutation.mutate({ id });
    }
  });

  const courses = coursesQuery.data?.data.results ?? [];
  const total = coursesQuery.data?.data.total ?? 0;

  return (
    <PageContent
      actions={
        <div className='flex justify-end'>
          <Button
            onClick={() => {
              setEditingCourse(null);
              setIsFormOpen(true);
            }}
          >
            {t`Create course`}
          </Button>
        </div>
      }
      filtersConfig={coursesFiltersConfig}
    >
      <div className='space-y-3'>
        <UserListingTable
          data={courses}
          columns={columns}
          isLoading={coursesQuery.isLoading}
          onPaginationChange={setPagination}
          pagination={pagination}
          total={total}
        />
      </div>

      <CourseFomDialog
        editValues={editingCourse}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingCourse(null);
        }}
        open={isFormOpen}
      />
    </PageContent>
  );
};
