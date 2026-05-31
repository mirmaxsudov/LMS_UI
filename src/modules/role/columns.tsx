import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { PencilIcon, ShieldIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';

interface UseRoleColumnsProps {
  deletingId?: string;
  onDelete: (id: string) => void;
  onEdit: (role: Role) => void;
}

interface RoleActionsCellProps extends UseRoleColumnsProps {
  role: Role;
}

const RoleActionsCell = ({ role, deletingId, onDelete, onEdit }: RoleActionsCellProps) => {
  const { t } = useLingui();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button size='icon-sm' type='button' variant='outline' onClick={() => onEdit(role)}>
        <PencilIcon className='size-4' />
      </Button>
      <Button
        disabled={role.name === 'SUPER_ADMIN'}
        size='icon-sm'
        type='button'
        variant='destructive'
        onClick={() => setIsDeleteOpen(true)}
      >
        <TrashIcon className='size-4' />
      </Button>
      <DeleteAlertDialog
        itemName={t`role`}
        isLoading={deletingId === role.id}
        onDelete={() => onDelete(role.id)}
        onOpenChange={setIsDeleteOpen}
        open={isDeleteOpen}
      />
    </div>
  );
};

export const useRoleColumns = ({
  deletingId,
  onDelete,
  onEdit
}: UseRoleColumnsProps): ColumnDef<Role>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'name',
        header: t`Role`,
        cell: ({ row }) => (
          <div className='flex min-w-56 flex-col gap-1'>
            <span className='flex items-center gap-2 font-medium'>
              <ShieldIcon className='text-muted-foreground size-4' />
              {row.original.name}
            </span>
            <span className='text-muted-foreground line-clamp-2 text-sm'>
              {row.original.description || t`No description`}
            </span>
          </div>
        )
      },
      {
        id: 'permissions',
        header: t`Permissions`,
        cell: ({ row }) => {
          const permissions = row.original.permissions ?? [];
          const visiblePermissions = permissions.slice(0, 3);
          const remainingCount = permissions.length - visiblePermissions.length;

          if (!permissions.length) return <span className='text-muted-foreground'>-</span>;

          return (
            <div className='flex max-w-xl flex-wrap gap-1'>
              {visiblePermissions.map((permission) => (
                <Badge key={permission.id} variant='secondary'>
                  {permission.code}
                </Badge>
              ))}
              {remainingCount > 0 && <Badge variant='outline'>+{remainingCount}</Badge>}
            </div>
          );
        }
      },
      {
        id: 'createdAt',
        header: t`Created`,
        accessorFn: (row) => new Date(row.createdAt).toLocaleDateString()
      },
      {
        id: 'actions',
        size: 32,
        cell: ({ row }) => (
          <RoleActionsCell
            deletingId={deletingId}
            onDelete={onDelete}
            onEdit={onEdit}
            role={row.original}
          />
        )
      }
    ],
    [t, deletingId, onDelete, onEdit]
  );
};
