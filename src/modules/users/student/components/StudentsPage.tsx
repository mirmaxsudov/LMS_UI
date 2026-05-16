import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import {
  mapStudentsFiltersToParams,
  ProfileCreateDialog,
  studentColumns,
  studentsFiltersConfig
} from '@/modules/users';
import { getStudentsQueryOptions } from '@/modules/users/student/options';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const StudentsPage = () => {
  const { t } = useLingui();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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
    <PageContent
      actions={
        <div className='mb-4 flex justify-end'>
          <Button onClick={() => setIsCreateDialogOpen(true)}>{t`Create student`}</Button>
        </div>
      }
      filtersConfig={studentsFiltersConfig}
    >
      <UserListingTable
        data={students}
        columns={studentColumns}
        isLoading={query.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <ProfileCreateDialog
        onOpenChange={setIsCreateDialogOpen}
        open={isCreateDialogOpen}
        role='student'
      />
    </PageContent>
  );
};
