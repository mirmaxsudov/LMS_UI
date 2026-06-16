import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import {
  getRoomsQueryOptions,
  mapRoomsFiltersToParams,
  RoomFormDialog,
  roomsFiltersConfig,
  useRoomColumns
} from '@/modules/room';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const RoomsPage = () => {
  const { t } = useLingui();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const filterValues = useUrlFilterValues(roomsFiltersConfig);

  const roomFilters = useMemo(() => mapRoomsFiltersToParams(filterValues), [filterValues]);

  const roomsQuery = useQuery(
    getRoomsQueryOptions({
      filters: roomFilters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const columns = useRoomColumns();
  const rooms = roomsQuery.data?.data.results ?? [];
  const total = roomsQuery.data?.data.total ?? 0;

  return (
    <PageContent
      actions={
        <div className='flex justify-end'>
          <Button onClick={() => setIsFormOpen(true)}>{t`Create room`}</Button>
        </div>
      }
      filtersConfig={roomsFiltersConfig}
    >
      <UserListingTable
        data={rooms}
        columns={columns}
        isLoading={roomsQuery.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <RoomFormDialog editValues={null} onOpenChange={setIsFormOpen} open={isFormOpen} />
    </PageContent>
  );
};
