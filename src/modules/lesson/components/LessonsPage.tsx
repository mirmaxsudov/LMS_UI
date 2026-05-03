import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import { useLessonColumns } from '@/modules/lesson/columns';
import { LessonFormDialog } from '@/modules/lesson/components/LessonFormDialog';
import { lessonsFiltersConfig, mapLessonsFiltersToParams } from '@/modules/lesson/filters';
import { getLessonsQueryOptions } from '@/modules/lesson/options';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const LessonsPage = () => {
  const { t } = useLingui();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const filterValues = useUrlFilterValues(lessonsFiltersConfig);

  const filters = useMemo(() => mapLessonsFiltersToParams(filterValues), [filterValues]);

  const lessonsQuery = useQuery(
    getLessonsQueryOptions({
      filters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const columns = useLessonColumns();
  const lessons = lessonsQuery.data?.data.results ?? [];
  const total = lessonsQuery.data?.data.total ?? 0;

  return (
    <PageContent
      actions={
        <div className='flex justify-end'>
          <Button onClick={() => setIsFormOpen(true)}>{t`Create lesson`}</Button>
        </div>
      }
      filtersConfig={lessonsFiltersConfig}
    >
      <UserListingTable
        data={lessons}
        columns={columns}
        isLoading={lessonsQuery.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <LessonFormDialog editValues={null} onOpenChange={setIsFormOpen} open={isFormOpen} />
    </PageContent>
  );
};
