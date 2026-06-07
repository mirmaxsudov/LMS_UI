import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import {
  getSchedulesQueryOptions,
  mapSchedulesFiltersToParams,
  ScheduleFormDialog,
  schedulesFiltersConfig,
  useScheduleColumns
} from '@/modules/schedule';
import { deleteSchedule } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const SchedulesPage = () => {
  const { t } = useLingui();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const filterValues = useUrlFilterValues(schedulesFiltersConfig);

  const filters = useMemo(() => mapSchedulesFiltersToParams(filterValues), [filterValues]);

  const schedulesQuery = useQuery(
    getSchedulesQueryOptions({
      filters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const { mutate: deleteScheduleMutation, variables: deleteScheduleVariables } = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: async () => {
      await schedulesQuery.refetch();
    }
  });

  const handleEdit = useCallback((schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      deleteScheduleMutation({ id });
    },
    [deleteScheduleMutation]
  );

  const columns = useScheduleColumns({
    deletingId: deleteScheduleVariables?.id,
    onDelete: handleDelete,
    onEdit: handleEdit
  });

  const schedules = schedulesQuery.data?.data.results ?? [];
  const total = schedulesQuery.data?.data.total ?? 0;

  return (
    <PageContent
      actions={
        <div className='mb-4 flex items-center justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-semibold'>{t`Schedule`}</h1>
            <p className='text-muted-foreground text-sm'>
              {t`Manage recurring group lesson times.`}
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingSchedule(null);
              setIsFormOpen(true);
            }}
          >
            {t`Create schedule`}
          </Button>
        </div>
      }
      filtersConfig={schedulesFiltersConfig}
    >
      <UserListingTable
        data={schedules}
        columns={columns}
        isLoading={schedulesQuery.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <ScheduleFormDialog
        editValues={editingSchedule}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingSchedule(null);
        }}
        open={isFormOpen}
      />
    </PageContent>
  );
};
