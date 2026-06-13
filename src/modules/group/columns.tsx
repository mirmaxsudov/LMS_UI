import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CalendarSyncIcon, PencilIcon, TrashIcon, UsersIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  dayOfWeekLabelMap,
  GenerateLessonSessionsDialog,
  getGroupStudentsCountStatus,
  GROUP_QUERY_KEYS,
  groupActivityColorMap,
  groupActivityLabelMap,
  GroupFormDialog,
  groupStatusColorMap,
  groupStatusLabelMap,
  groupStudentsCountStatusColorMap,
  groupStudentsCountStatusLabelMap,
  ManageGroupStudentsDialog,
  scheduleTypeLabelMap
} from '@/modules/group';
import { deleteGroup } from '@/shared/api';
import { useHashDialog } from '@/shared/hooks/use-hash-dialog';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';

interface GroupActionsCellProps {
  group: Group;
}

interface GroupBadgeProps {
  color: string;
  label: string;
}

const getTeacherName = (teacher?: GroupTeacher) =>
  [teacher?.firstName, teacher?.middleName, teacher?.lastName].filter(Boolean).join(' ') || '-';

const GroupBadge = ({ color, label }: GroupBadgeProps) => (
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

const GroupActionsCell = ({ group }: GroupActionsCellProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isGenerateLessonDialogOpen, setGenerateLessonDialogOpen] = useState<boolean>(false);
  const [isManageStudentsOpen, setManageStudentsOpen] = useHashDialog(
    `manage-students-${group.id}`
  );

  const deleteMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.base() });
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
        onClick={() => setGenerateLessonDialogOpen(true)}
      >
        <CalendarSyncIcon className='size-4' />
      </Button>
      <Button
        size='icon-sm'
        type='button'
        variant='outline'
        onClick={() => setManageStudentsOpen(true)}
      >
        <UsersIcon className='size-4' />
      </Button>
      <Button
        size='icon-sm'
        type='button'
        variant='destructive'
        onClick={() => setIsDeleteOpen(true)}
      >
        <TrashIcon className='size-4' />
      </Button>
      <GenerateLessonSessionsDialog
        groupId={group.id}
        onOpenChange={setGenerateLessonDialogOpen}
        open={isGenerateLessonDialogOpen}
      />
      <ManageGroupStudentsDialog
        groupId={group.id}
        onOpenChange={setManageStudentsOpen}
        open={isManageStudentsOpen}
      />
      <DeleteAlertDialog
        itemName={t`group`}
        isLoading={deleteMutation.isPending}
        onDelete={() => deleteMutation.mutate({ id: group.id })}
        onOpenChange={setIsDeleteOpen}
        open={isDeleteOpen}
      />
      <GroupFormDialog editValues={group} onOpenChange={setIsFormOpen} open={isFormOpen} />
    </div>
  );
};

export const useGroupColumns = (): ColumnDef<Group>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'name',
        header: t`Name`,
        accessorKey: 'name'
      },
      {
        id: 'courseName',
        header: t`Course`,
        accessorFn: (row) => row.courseName || '-'
      },
      {
        id: 'teacher',
        header: t`Teacher`,
        accessorFn: (row) => getTeacherName(row.teacher)
      },
      {
        id: 'students',
        header: t`Students`,
        cell: ({ row }) => {
          const { currentStudents, capacity } = row.original;
          const status = getGroupStudentsCountStatus(currentStudents, capacity);

          return (
            <div className='flex items-center gap-2'>
              <span>
                {currentStudents}/{capacity}
              </span>
              <GroupBadge
                label={t(groupStudentsCountStatusLabelMap[status])}
                color={groupStudentsCountStatusColorMap[status]}
              />
            </div>
          );
        }
      },
      {
        id: 'scheduleType',
        header: t`Schedule type`,
        accessorFn: (row) => t(scheduleTypeLabelMap[row.scheduleType])
      },
      {
        id: 'scheduleDays',
        header: t`Schedule days`,
        accessorFn: (row) =>
          row.scheduleDays.length
            ? row.scheduleDays.map((day) => t(dayOfWeekLabelMap[day])).join(', ')
            : '-'
      },
      {
        id: 'status',
        header: t`Status`,
        cell: ({ row }) => {
          const status = row.original.status;

          return status ? (
            <GroupBadge
              label={t(groupStatusLabelMap[status])}
              color={groupStatusColorMap[status]}
            />
          ) : (
            '-'
          );
        }
      },
      {
        id: 'active',
        header: t`Activity`,
        cell: ({ row }) => {
          const activity = row.original.active ? 'active' : 'inactive';

          return (
            <GroupBadge
              label={t(groupActivityLabelMap[activity])}
              color={groupActivityColorMap[activity]}
            />
          );
        }
      },
      {
        id: 'actions',
        size: 32,
        cell: ({ row }) => <GroupActionsCell group={row.original} />
      }
    ],
    [t]
  );
};
