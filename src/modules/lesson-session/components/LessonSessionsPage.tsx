import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import {
  getLessonSessionsQueryOptions,
  LessonSessionFormDialog,
  lessonSessionsFiltersConfig,
  mapLessonSessionsFiltersToParams,
  useLessonSessionColumns
} from '@/modules/lesson-session';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const LessonSessionsPage = () => {
  const { t } = useLingui();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const filterValues = useUrlFilterValues(lessonSessionsFiltersConfig);

  const filters = useMemo(
    () => mapLessonSessionsFiltersToParams(filterValues),
    [filterValues]
  );

  const lessonSessionsQuery = useQuery(
    getLessonSessionsQueryOptions({
      filters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const columns = useLessonSessionColumns();
  const lessonSessions = lessonSessionsQuery.data?.data.results ?? [];
  const total = lessonSessionsQuery.data?.data.total ?? 0;

  return (
    <PageContent
      actions={
        <div className='flex justify-end'>
          <Button onClick={() => setIsFormOpen(true)}>{t`Create lesson session`}</Button>
        </div>
      }
      filtersConfig={lessonSessionsFiltersConfig}
    >
      <UserListingTable
        data={lessonSessions}
        columns={columns}
        isLoading={lessonSessionsQuery.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <LessonSessionFormDialog editValues={null} onOpenChange={setIsFormOpen} open={isFormOpen} />
    </PageContent>
  );
};
