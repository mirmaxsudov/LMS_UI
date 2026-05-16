import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import {
  mapTeachersFiltersToParams,
  ProfileCreateDialog,
  teacherColumns,
  teachersFiltersConfig
} from '@/modules/users';
import { getTeachersQueryOptions } from '@/modules/users/teacher/options';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const TeachersPage = () => {
  const { t } = useLingui();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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
    <PageContent
      actions={
        <div className='mb-4 flex justify-end'>
          <Button onClick={() => setIsCreateDialogOpen(true)}>{t`Create teacher`}</Button>
        </div>
      }
      filtersConfig={teachersFiltersConfig}
    >
      <UserListingTable
        data={teachers}
        columns={teacherColumns}
        isLoading={query.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <ProfileCreateDialog
        onOpenChange={setIsCreateDialogOpen}
        open={isCreateDialogOpen}
        role='teacher'
      />
    </PageContent>
  );
};
