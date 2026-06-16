import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckIcon, PencilIcon, SettingsIcon, TrashIcon, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  ROOM_QUERY_KEYS,
  RoomFormDialog,
  roomStatusColorMap,
  RoomStatusDialog,
  roomStatusLabelMap,
  roomTypeColorMap,
  roomTypeLabelMap
} from '@/modules/room';
import { deleteRoom } from '@/shared/api';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';

interface RoomActionsCellProps {
  room: Room;
}

interface RoomBadgeProps {
  color: string;
  label: string;
}

const RoomBadge = ({ color, label }: RoomBadgeProps) => (
  <Badge
    style={{
      backgroundColor: `${color}33`,
      color
    }}
    className='border-transparent'
  >
    {label}
  </Badge>
);

const RoomFeature = ({ enabled }: { enabled: boolean }) =>
  enabled ? (
    <CheckIcon className='size-4 text-emerald-600' />
  ) : (
    <XIcon className='text-muted-foreground size-4' />
  );

const RoomActionsCell = ({ room }: RoomActionsCellProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

  const deleteMutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEYS.base() });
      setIsDeleteOpen(false);
    }
  });

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button size='icon-sm' type='button' variant='outline' onClick={() => setIsFormOpen(true)}>
        <PencilIcon className='size-4' />
      </Button>
      <Button
        size='icon-sm'
        type='button'
        variant='default-light'
        onClick={() => setIsStatusOpen(true)}
      >
        <SettingsIcon className='size-4' />
      </Button>
      <Button
        size='icon-sm'
        type='button'
        variant='destructive'
        onClick={() => setIsDeleteOpen(true)}
      >
        <TrashIcon className='size-4' />
      </Button>
      <RoomFormDialog editValues={room} onOpenChange={setIsFormOpen} open={isFormOpen} />
      <RoomStatusDialog onOpenChange={setIsStatusOpen} open={isStatusOpen} room={room} />
      <DeleteAlertDialog
        itemName={t`room`}
        isLoading={deleteMutation.isPending}
        onDelete={() => deleteMutation.mutate({ id: room.id })}
        onOpenChange={setIsDeleteOpen}
        open={isDeleteOpen}
      />
    </div>
  );
};

export const useRoomColumns = (): ColumnDef<Room>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'name',
        header: t`Name`,
        accessorKey: 'name'
      },
      {
        id: 'roomType',
        header: t`Type`,
        cell: ({ row }) => (
          <RoomBadge
            label={t(roomTypeLabelMap[row.original.roomType])}
            color={roomTypeColorMap[row.original.roomType]}
          />
        )
      },
      {
        id: 'building',
        header: t`Building`,
        accessorFn: (row) => row.building || '-'
      },
      {
        id: 'floor',
        header: t`Floor`,
        accessorKey: 'floor'
      },
      {
        id: 'capacity',
        header: t`Capacity`,
        accessorKey: 'capacity'
      },
      {
        id: 'hasProjector',
        header: t`Projector`,
        cell: ({ row }) => <RoomFeature enabled={row.original.hasProjector} />
      },
      {
        id: 'hasComputers',
        header: t`Computers`,
        cell: ({ row }) => <RoomFeature enabled={row.original.hasComputers} />
      },
      {
        id: 'status',
        header: t`Status`,
        cell: ({ row }) => (
          <RoomBadge
            label={t(roomStatusLabelMap[row.original.status])}
            color={roomStatusColorMap[row.original.status]}
          />
        )
      },
      {
        id: 'actions',
        size: 32,
        cell: ({ row }) => <RoomActionsCell room={row.original} />
      }
    ],
    [t]
  );
};
