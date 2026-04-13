import type { PaginationState } from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getParentsQueryOptions, UserListingTable, useUrlFilterValues } from '@/features';
import { mapParentsFiltersToParams, parentColumns, parentsFiltersConfig } from '@/modules/users';
import { PageContent } from '@/shared/ui/page';

export const ParentsPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const filterValues = useUrlFilterValues(parentsFiltersConfig);
  const query = useQuery(
    getParentsQueryOptions({
      filters: mapParentsFiltersToParams(filterValues),
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const parents = query.data?.data.results ?? [];
  const total = query.data?.data.total ?? 0;

  return (
    <PageContent filtersConfig={parentsFiltersConfig}>
      <UserListingTable
        data={parents}
        columns={parentColumns}
        isLoading={query.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
    </PageContent>
  );
};
