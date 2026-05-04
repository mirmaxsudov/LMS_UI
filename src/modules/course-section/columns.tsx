import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/shared/ui/button';
import { DeleteAlertDialog } from '@/shared/ui/delete-alert-dialog';

interface UseCourseSectionColumnsProps {
  deletingId?: string;
  onDelete: (id: string) => void;
  onEdit: (courseSection: CourseSection) => void;
}

interface CourseSectionActionsCellProps extends UseCourseSectionColumnsProps {
  courseSection: CourseSection;
}

const CourseSectionActionsCell = ({
  courseSection,
  onEdit,
  onDelete,
  deletingId
}: CourseSectionActionsCellProps) => {
  const { t } = useLingui();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button size='icon-sm' type='button' variant='outline' onClick={() => onEdit(courseSection)}>
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
        itemName={t`course section`}
        isLoading={deletingId === courseSection.id}
        onDelete={() => onDelete(courseSection.id)}
        onOpenChange={setIsDeleteOpen}
        open={isDeleteOpen}
      />
    </div>
  );
};

export const useCourseSectionColumns = ({
  onEdit,
  onDelete,
  deletingId
}: UseCourseSectionColumnsProps): ColumnDef<CourseSection>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'title',
        header: t`Title`,
        accessorKey: 'title'
      },
      {
        id: 'courseTitle',
        header: t`Course`,
        accessorFn: (row) => row.courseTitle || '-'
      },
      {
        id: 'orderIndex',
        header: t`Order index`,
        accessorKey: 'orderIndex'
      },
      {
        id: 'lessons',
        header: t`Lessons`,
        accessorFn: (row) => row.lessons?.length ?? 0
      },
      {
        id: 'actions',
        size: 32,
        cell: ({ row }) => (
          <CourseSectionActionsCell
            deletingId={deletingId}
            courseSection={row.original}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )
      }
    ],
    [t, onEdit, onDelete, deletingId]
  );
};
