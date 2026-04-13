import type { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import { DataTable } from '@/shared/ui/data-table';

interface UserListingTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading: boolean;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  total: number;
}

export const UserListingTable = <TData,>({
  columns,
  data,
  total,
  isLoading,
  pagination,
  onPaginationChange
}: UserListingTableProps<TData>) => {
  const { t } = useLingui();
  const pageCount = Math.max(1, Math.ceil(total / pagination.pageSize));

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount,
    state: {
      pagination
    },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
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
    </div>
  );
};
