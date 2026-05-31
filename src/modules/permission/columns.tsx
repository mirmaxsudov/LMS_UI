import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { PencilIcon, ShieldCheckIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { permissionCategoryLabelMap } from '@/modules/permission/constants';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';

interface UsePermissionColumnsProps {
  deletingId?: string;
  onDelete: (id: string) => void;
  onEdit: (permission: Permission) => void;
}

interface PermissionActionsCellProps extends UsePermissionColumnsProps {
  permission: Permission;
}

const PermissionActionsCell = ({
  permission,
  deletingId,
  onDelete,
  onEdit
}: PermissionActionsCellProps) => {
  const { t } = useLingui();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button size='icon-sm' type='button' variant='outline' onClick={() => onEdit(permission)}>
        <PencilIcon className='size-4' />
      </Button>
      <Button
        disabled={permission.isSystem}
        size='icon-sm'
        type='button'
        variant='destructive'
        onClick={() => setIsDeleteOpen(true)}
      >
        <TrashIcon className='size-4' />
      </Button>
      <DeleteAlertDialog
        itemName={t`permission`}
        isLoading={deletingId === permission.id}
        onDelete={() => onDelete(permission.id)}
        onOpenChange={setIsDeleteOpen}
        open={isDeleteOpen}
      />
    </div>
  );
};

export const usePermissionColumns = ({
  deletingId,
  onDelete,
  onEdit
}: UsePermissionColumnsProps): ColumnDef<Permission>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'code',
        header: t`Code`,
        cell: ({ row }) => (
          <div className='flex min-w-56 flex-col gap-1'>
            <span className='font-medium'>{row.original.code}</span>
            <span className='text-muted-foreground line-clamp-2 text-sm'>
              {row.original.description || t`No description`}
            </span>
          </div>
        )
      },
      {
        id: 'category',
        header: t`Category`,
        cell: ({ row }) => (
          <Badge variant='secondary'>{t(permissionCategoryLabelMap[row.original.category])}</Badge>
        )
      },
      {
        id: 'module',
        header: t`Module`,
        accessorFn: (row) => row.module || '-'
      },
      {
        id: 'action',
        header: t`Action`,
        accessorFn: (row) => row.action || '-'
      },
      {
        id: 'isSystem',
        header: t`Type`,
        cell: ({ row }) =>
          row.original.isSystem ? (
            <Badge>
              <ShieldCheckIcon className='size-3' />
              {t`System`}
            </Badge>
          ) : (
            <Badge variant='outline'>{t`Custom`}</Badge>
          )
      },
      {
        id: 'actions',
        size: 32,
        cell: ({ row }) => (
          <PermissionActionsCell
            deletingId={deletingId}
            onDelete={onDelete}
            onEdit={onEdit}
            permission={row.original}
          />
        )
      }
    ],
    [t, deletingId, onDelete, onEdit]
  );
};
