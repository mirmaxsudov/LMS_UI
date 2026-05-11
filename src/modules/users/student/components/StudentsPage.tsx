import type { PaginationState } from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getStudentsQueryOptions, UserListingTable, useUrlFilterValues } from '@/features';
import { mapStudentsFiltersToParams, studentColumns, studentsFiltersConfig } from '@/modules/users';
import { PageContent } from '@/shared/ui/page';

export const StudentsPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const filterValues = useUrlFilterValues(studentsFiltersConfig);
  const query = useQuery(
    getStudentsQueryOptions({
      filters: mapStudentsFiltersToParams(filterValues),
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const students = query.data?.data.results ?? [];
  const total = query.data?.data.total ?? 0;

  return (
    <PageContent filtersConfig={studentsFiltersConfig}>
      <UserListingTable
        data={students}
        columns={studentColumns}
        isLoading={query.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
    </PageContent>
  );
};
