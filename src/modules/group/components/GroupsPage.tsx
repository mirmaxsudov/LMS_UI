import type { PaginationState } from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import { useGroupColumns } from '@/modules/group/columns';
import { groupsFiltersConfig, mapGroupsFiltersToParams } from '@/modules/group/filters';
import { GROUP_QUERY_KEYS } from '@/modules/group/options';
import { getGroups } from '@/shared/api';
import { PageContent } from '@/shared/ui/page';

export const GroupsPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const filterValues = useUrlFilterValues(groupsFiltersConfig);

  const requestParams = useMemo(
    () => ({
      ...mapGroupsFiltersToParams(filterValues),
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    }),
    [filterValues, pagination.pageIndex, pagination.pageSize]
  );

  const groupsQuery = useQuery({
    queryKey: GROUP_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getGroups({ params: requestParams })
  });

  const columns = useGroupColumns();
  const groups = groupsQuery.data?.data.results ?? [];
  const total = groupsQuery.data?.data.total ?? 0;

  return (
    <PageContent filtersConfig={groupsFiltersConfig}>
      <UserListingTable
        data={groups}
        columns={columns}
        isLoading={groupsQuery.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
    </PageContent>
  );
};
