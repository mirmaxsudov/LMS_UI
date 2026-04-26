import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { courseLevelLabelMap } from '@/modules/course/constants';
import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';

interface UseCourseColumnsProps {
  deletingId?: string;
  onDelete: (id: string) => void;
  onEdit: (course: Course) => void;
}

interface CourseActionsCellProps extends UseCourseColumnsProps {
  course: Course;
}

const CourseActionsCell = ({ course, onEdit, onDelete, deletingId }: CourseActionsCellProps) => {
  const { t } = useLingui();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button size='icon-sm' type='button' variant='outline' onClick={() => onEdit(course)}>
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
        itemName={t`course`}
        isLoading={deletingId === course.id}
        onDelete={() => onDelete(course.id)}
        onOpenChange={setIsDeleteOpen}
        open={isDeleteOpen}
      />
    </div>
  );
};

export const useCourseColumns = ({
  onEdit,
  onDelete,
  deletingId
}: UseCourseColumnsProps): ColumnDef<Course>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'title',
        header: t`Title`,
        accessorKey: 'title'
      },
      {
        id: 'level',
        header: t`Level`,
        accessorFn: (row) => t(courseLevelLabelMap[row.level])
      },
      {
        id: 'durationInMinutes',
        header: t`Duration`,
        accessorFn: (row) => `${row.durationInMinutes} min`
      },
      {
        id: 'description',
        header: t`Description`,
        accessorFn: (row) => row.description || '-'
      },
      {
        id: 'actions',
        size: 32,
        cell: ({ row }) => (
          <CourseActionsCell
            deletingId={deletingId}
            course={row.original}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )
      }
    ],
    [t, onEdit, onDelete, deletingId]
  );
};
