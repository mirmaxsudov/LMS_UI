import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { DataTable } from '@/shared/ui/data-table';

interface UserListingTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  total: number;
  fetchNextPage: () => Promise<unknown>;
}

export const UserListingTable = <TData,>({
  columns,
  data,
  total,
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage
}: UserListingTableProps<TData>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const { t } = useLingui();

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className='space-y-3'>
      <div className='text-muted-foreground text-sm'>{t`Total: ${total}`}</div>
      <DataTable
        table={table}
        isLoading={isLoading}
        loadingOptions={{ columnCount: columns.length }}
      />
      {hasNextPage ? (
        <Button
          className='w-full md:w-auto'
          disabled={isFetchingNextPage}
          type='button'
          variant='outline'
          onClick={() => {
            void fetchNextPage();
          }}
        >
          {isFetchingNextPage ? t`Loading more...` : t`Load more`}
        </Button>
      ) : null}
    </div>
  );
};
