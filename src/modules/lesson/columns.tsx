import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { LessonFormDialog } from '@/modules/lesson/components/LessonFormDialog';
import { LESSON_QUERY_KEYS } from '@/modules/lesson/options';
import { deleteLesson } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';

interface LessonActionsCellProps {
  lesson: Lesson;
}

const LessonActionsCell = ({ lesson }: LessonActionsCellProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteLesson,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: LESSON_QUERY_KEYS.all() });
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
        itemName={t`lesson`}
        isLoading={deleteMutation.isPending}
        onDelete={() => deleteMutation.mutate({ id: lesson.id })}
        onOpenChange={setIsDeleteOpen}
        open={isDeleteOpen}
      />
      <LessonFormDialog editValues={lesson} onOpenChange={setIsFormOpen} open={isFormOpen} />
    </div>
  );
};

export const useLessonColumns = (): ColumnDef<Lesson>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'title',
        header: t`Title`,
        accessorKey: 'title'
      },
      {
        id: 'sectionId',
        header: t`Section`,
        accessorFn: (row) => row.sectionId || '-'
      },
      {
        id: 'durationInMinutes',
        header: t`Duration`,
        accessorFn: (row) => `${row.durationInMinutes} min`
      },
      {
        id: 'content',
        header: t`Content`,
        accessorFn: (row) => row.content || '-'
      },
      {
        id: 'actions',
        size: 32,
        cell: ({ row }) => <LessonActionsCell lesson={row.original} />
      }
    ],
    [t]
  );
};
