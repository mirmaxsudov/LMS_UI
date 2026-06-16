import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { dayOfWeekLabelMap } from '@/modules/group';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';

interface UseScheduleColumnsProps {
  deletingId?: string;
  onDelete: (id: string) => void;
  onEdit: (schedule: Schedule) => void;
}

interface ScheduleActionsCellProps extends UseScheduleColumnsProps {
  schedule: Schedule;
}

const formatTime = (value: string) => value.slice(0, 5);

const ScheduleActionsCell = ({
  schedule,
  onEdit,
  onDelete,
  deletingId
}: ScheduleActionsCellProps) => {
  const { t } = useLingui();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button
        aria-label={t`Edit schedule`}
        size='icon-sm'
        type='button'
        variant='outline'
        onClick={() => onEdit(schedule)}
      >
        <PencilIcon className='size-4' />
      </Button>
      <Button
        aria-label={t`Delete schedule`}
        size='icon-sm'
        type='button'
        variant='destructive'
        onClick={() => setIsDeleteOpen(true)}
      >
        <TrashIcon className='size-4' />
      </Button>
      <DeleteAlertDialog
        itemName={t`schedule`}
        isLoading={deletingId === schedule.id}
        onDelete={() => onDelete(schedule.id)}
        onOpenChange={setIsDeleteOpen}
        open={isDeleteOpen}
      />
    </div>
  );
};

export const useScheduleColumns = ({
  onEdit,
  onDelete,
  deletingId
}: UseScheduleColumnsProps): ColumnDef<Schedule>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'groupName',
        header: t`Group`,
        accessorFn: (row) => row.groupName || '-'
      },
      {
        id: 'roomName',
        header: t`Room`,
        accessorFn: (row) => row.roomName || '-'
      },
      {
        id: 'dayOfWeek',
        header: t`Day of week`,
        cell: ({ row }) => (
          <Badge variant='secondary'>{t(dayOfWeekLabelMap[row.original.dayOfWeek])}</Badge>
        )
      },
      {
        id: 'startTime',
        header: t`Start time`,
        accessorFn: (row) => formatTime(row.startTime)
      },
      {
        id: 'endTime',
        header: t`End time`,
        accessorFn: (row) => formatTime(row.endTime)
      },
      {
        id: 'actions',
        size: 32,
        cell: ({ row }) => (
          <ScheduleActionsCell
            deletingId={deletingId}
            schedule={row.original}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )
      }
    ],
    [t, onEdit, onDelete, deletingId]
  );
};
