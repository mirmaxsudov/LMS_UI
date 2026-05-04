import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import {
  CourseSectionFormDialog,
  courseSectionsFiltersConfig,
  getCourseSectionsQueryOptions,
  mapCourseSectionsFiltersToParams,
  useCourseSectionColumns
} from '@/modules/course-section';
import { deleteCourseSection } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const CourseSectionsPage = () => {
  const { t } = useLingui();

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [editingCourseSection, setEditingCourseSection] = useState<CourseSection | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filterValues = useUrlFilterValues(courseSectionsFiltersConfig);

  const courseSectionFilters = useMemo(
    () => mapCourseSectionsFiltersToParams(filterValues),
    [filterValues]
  );

  const courseSectionsQuery = useQuery(
    getCourseSectionsQueryOptions({
      filters: courseSectionFilters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const deleteMutation = useMutation({
    mutationFn: deleteCourseSection,
    onSuccess: async () => {
      await courseSectionsQuery.refetch();
    }
  });

  const columns = useCourseSectionColumns({
    deletingId: deleteMutation.variables?.id,
    onEdit: (courseSection) => {
      setEditingCourseSection(courseSection);
      setIsFormOpen(true);
    },
    onDelete: (id) => {
      deleteMutation.mutate({ id });
    }
  });

  const courseSections = courseSectionsQuery.data?.data.results ?? [];
  const total = courseSectionsQuery.data?.data.total ?? 0;

  return (
    <PageContent
      actions={
        <div className='flex justify-end'>
          <Button
            onClick={() => {
              setEditingCourseSection(null);
              setIsFormOpen(true);
            }}
          >
            {t`Create course section`}
          </Button>
        </div>
      }
      filtersConfig={courseSectionsFiltersConfig}
    >
      <UserListingTable
        data={courseSections}
        columns={columns}
        isLoading={courseSectionsQuery.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />

      <CourseSectionFormDialog
        editValues={editingCourseSection}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingCourseSection(null);
        }}
        open={isFormOpen}
      />
    </PageContent>
  );
};
