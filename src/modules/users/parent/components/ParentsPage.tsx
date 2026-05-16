import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import {
  mapParentsFiltersToParams,
  parentColumns,
  parentsFiltersConfig,
  ProfileCreateDialog
} from '@/modules/users';
import { getParentsQueryOptions } from '@/modules/users/parent/options';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const ParentsPage = () => {
  const { t } = useLingui();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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
    <PageContent
      actions={
        <div className='mb-4 flex justify-end'>
          <Button onClick={() => setIsCreateDialogOpen(true)}>{t`Create parent`}</Button>
        </div>
      }
      filtersConfig={parentsFiltersConfig}
    >
      <UserListingTable
        data={parents}
        columns={parentColumns}
        isLoading={query.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <ProfileCreateDialog
        onOpenChange={setIsCreateDialogOpen}
        open={isCreateDialogOpen}
        role='parent'
      />
    </PageContent>
  );
};
