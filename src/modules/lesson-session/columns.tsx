import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  LESSON_SESSION_QUERY_KEYS,
  LessonSessionFormDialog,
  lessonSessionStatusColorMap,
  lessonSessionStatusLabelMap
} from '@/modules/lesson-session';
import { deleteLessonSession } from '@/shared/api';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';

interface LessonSessionBadgeProps {
  color: string;
  label: string;
}

interface LessonSessionActionsCellProps {
  lessonSession: LessonSession;
}

const formatDateTime = (value: string) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return format(date, 'dd.MM.yyyy HH:mm');
};

const LessonSessionBadge = ({ color, label }: LessonSessionBadgeProps) => (
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

const LessonSessionActionsCell = ({ lessonSession }: LessonSessionActionsCellProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteLessonSession,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: LESSON_SESSION_QUERY_KEYS.base() });
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
        variant='destructive'
        onClick={() => setIsDeleteOpen(true)}
      >
        <TrashIcon className='size-4' />
      </Button>
      <DeleteAlertDialog
        itemName={t`lesson session`}
        isLoading={deleteMutation.isPending}
        onDelete={() => deleteMutation.mutate({ id: lessonSession.id })}
        onOpenChange={setIsDeleteOpen}
        open={isDeleteOpen}
      />
      <LessonSessionFormDialog
        editValues={lessonSession}
        onOpenChange={setIsFormOpen}
        open={isFormOpen}
      />
    </div>
  );
};

export const useLessonSessionColumns = (): ColumnDef<LessonSession>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'groupName',
        header: t`Group`,
        accessorFn: (row) => row.groupName || '-'
      },
      {
        id: 'lessonTitle',
        header: t`Lesson`,
        accessorFn: (row) => row.lessonTitle || '-'
      },
      {
        id: 'startTime',
        header: t`Start time`,
        accessorFn: (row) => formatDateTime(row.startTime)
      },
      {
        id: 'endTime',
        header: t`End time`,
        accessorFn: (row) => formatDateTime(row.endTime)
      },
      {
        id: 'status',
        header: t`Status`,
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <LessonSessionBadge
              label={t(lessonSessionStatusLabelMap[status])}
              color={lessonSessionStatusColorMap[status]}
            />
          );
        }
      },
      {
        id: 'actions',
        size: 32,
        cell: ({ row }) => <LessonSessionActionsCell lessonSession={row.original} />
      }
    ],
    [t]
  );
};
