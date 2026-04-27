import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import {
  getGroupsQueryOptions,
  GroupFormDialog,
  groupsFiltersConfig,
  mapGroupsFiltersToParams,
  useGroupColumns
} from '@/modules/group';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const GroupsPage = () => {
  const { t } = useLingui();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const filterValues = useUrlFilterValues(groupsFiltersConfig);

  const groupFilters = useMemo(() => mapGroupsFiltersToParams(filterValues), [filterValues]);

  const groupsQuery = useQuery(
    getGroupsQueryOptions({
      filters: groupFilters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const columns = useGroupColumns();
  const groups = groupsQuery.data?.data.results ?? [];
  const total = groupsQuery.data?.data.total ?? 0;

  return (
    <PageContent
      actions={
        <div className='flex justify-end'>
          <Button
            onClick={() => {
              setIsFormOpen(true);
            }}
          >
            {t`Create group`}
          </Button>
        </div>
      }
      filtersConfig={groupsFiltersConfig}
    >
      <UserListingTable
        data={groups}
        columns={columns}
        isLoading={groupsQuery.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <GroupFormDialog editValues={null} onOpenChange={setIsFormOpen} open={isFormOpen} />
    </PageContent>
  );
};
