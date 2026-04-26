import type { PaginationState } from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import { mapTeachersFiltersToParams, teacherColumns, teachersFiltersConfig } from '@/modules/users';
import { getTeachersQueryOptions } from '@/modules/users/teacher/options';
import { PageContent } from '@/shared/ui/page';

export const TeachersPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const filterValues = useUrlFilterValues(teachersFiltersConfig);
  const query = useQuery(
    getTeachersQueryOptions({
      filters: mapTeachersFiltersToParams(filterValues),
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const teachers = query.data?.data.results ?? [];
  const total = query.data?.data.total ?? 0;

  return (
    <PageContent filtersConfig={teachersFiltersConfig}>
      <UserListingTable
        data={teachers}
        columns={teacherColumns}
        isLoading={query.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
    </PageContent>
  );
};
