import type { PaginationState } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { UserListingTable, useUrlFilterValues } from '@/features';
import { useRoleColumns } from '@/modules/role/columns';
import { RoleFormDialog } from '@/modules/role/components/RoleFormDialog';
import { mapRolesFiltersToParams, rolesFiltersConfig } from '@/modules/role/filters';
import { getRolesQueryOptions } from '@/modules/role/options';
import { deleteRole } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

export const RolesPage = () => {
  const { t } = useLingui();

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filterValues = useUrlFilterValues(rolesFiltersConfig);
  const roleFilters = useMemo(() => mapRolesFiltersToParams(filterValues), [filterValues]);

  const rolesQuery = useQuery(
    getRolesQueryOptions({
      filters: roleFilters,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize
    })
  );

  const deleteMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: async () => {
      await rolesQuery.refetch();
    }
  });

  const columns = useRoleColumns({
    deletingId: deleteMutation.variables?.id,
    onEdit: (role) => {
      setEditingRole(role);
      setIsFormOpen(true);
    },
    onDelete: (id) => {
      deleteMutation.mutate({ id });
    }
  });

  const roles = rolesQuery.data?.data.results ?? [];
  const total = rolesQuery.data?.data.total ?? 0;

  return (
    <PageContent
      actions={
        <div className='mb-4 flex items-center justify-between gap-3'>
          <div>
            <h1 className='text-2xl font-semibold'>{t`Roles`}</h1>
            <p className='text-muted-foreground text-sm'>
              {t`Create roles and control which permissions belong to each role.`}
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingRole(null);
              setIsFormOpen(true);
            }}
          >
            <PlusIcon className='size-4' />
            {t`Create role`}
          </Button>
        </div>
      }
      filtersConfig={rolesFiltersConfig}
    >
      <UserListingTable
        data={roles}
        columns={columns}
        isLoading={rolesQuery.isLoading}
        onPaginationChange={setPagination}
        pagination={pagination}
        total={total}
      />
      <RoleFormDialog
        editValues={editingRole}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingRole(null);
        }}
        open={isFormOpen}
      />
    </PageContent>
  );
};
