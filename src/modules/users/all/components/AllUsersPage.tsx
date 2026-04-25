import type { PaginationState } from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getAllUsersQueryOptions, UserListingTable, useUrlFilterValues } from '@/features';
import {
  mapAllUsersFiltersToParams,
  useAllUsersColumns,
  useAllUsersFiltersConfig
} from '@/modules/users';
import { PageContent } from '@/shared/ui/page';

export const AllUsersPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const columns = useAllUsersColumns();
  const filtersConfig = useAllUsersFiltersConfig();
  const filterValues = useUrlFilterValues(filtersConfig);

  const query = useQuery(
    getAllUsersQueryOptions({
      filters: mapAllUsersFiltersToParams(filterValues),
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const users = query.data?.data.results ?? [];
  const total = query.data?.data.total ?? 0;

  return (
    <PageContent filtersConfig={filtersConfig}>
      <UserListingTable
        data={users}
        columns={columns}
        isLoading={query.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
    </PageContent>
  );
};
