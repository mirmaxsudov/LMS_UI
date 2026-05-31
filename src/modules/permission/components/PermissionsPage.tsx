import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import { usePermissionColumns } from '@/modules/permission/columns';
import { PermissionFormDialog } from '@/modules/permission/components/PermissionFormDialog';
import {
  mapPermissionsFiltersToParams,
  permissionsFiltersConfig
} from '@/modules/permission/filters';
import { getPermissionsQueryOptions } from '@/modules/permission/options';
import { deletePermission } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const PermissionsPage = () => {
  const { t } = useLingui();

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filterValues = useUrlFilterValues(permissionsFiltersConfig);
  const permissionFilters = useMemo(
    () => mapPermissionsFiltersToParams(filterValues),
    [filterValues]
  );

  const permissionsQuery = useQuery(
    getPermissionsQueryOptions({
      filters: permissionFilters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const deleteMutation = useMutation({
    mutationFn: deletePermission,
    onSuccess: async () => {
      await permissionsQuery.refetch();
    }
  });

  const columns = usePermissionColumns({
    deletingId: deleteMutation.variables?.id,
    onEdit: (permission) => {
      setEditingPermission(permission);
      setIsFormOpen(true);
    },
    onDelete: (id) => {
      deleteMutation.mutate({ id });
    }
  });

  const permissions = permissionsQuery.data?.data.results ?? [];
  const total = permissionsQuery.data?.data.total ?? 0;

  return (
    <PageContent
      actions={
        <div className='mb-4 flex items-center justify-between gap-3'>
          <div>
            <h1 className='text-2xl font-semibold'>{t`Permissions`}</h1>
            <p className='text-muted-foreground text-sm'>
              {t`Create and maintain authorities used by application roles.`}
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingPermission(null);
              setIsFormOpen(true);
            }}
          >
            <PlusIcon className='size-4' />
            {t`Create permission`}
          </Button>
        </div>
      }
      filtersConfig={permissionsFiltersConfig}
    >
      <UserListingTable
        data={permissions}
        columns={columns}
        isLoading={permissionsQuery.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <PermissionFormDialog
        editValues={editingPermission}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingPermission(null);
        }}
        open={isFormOpen}
      />
    </PageContent>
  );
};
