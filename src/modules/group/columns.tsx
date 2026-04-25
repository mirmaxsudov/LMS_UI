import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';

import { groupStatusLabelMap } from '@/modules/group/constants';
import { Badge } from '@/shared/ui/badge';

const getTeacherName = (teacher?: GroupTeacher) =>
  [teacher?.firstName, teacher?.middleName, teacher?.lastName].filter(Boolean).join(' ') || '-';

const getStatusBadgeVariant = (status?: GroupStatus) => {
  if (status === 'ACTIVE' || status === 'FORMING') return 'success';
  if (status === 'CANCELLED') return 'destructive';

  return 'secondary';
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
        accessorFn: (row) => `${row.currentStudents}/${row.capacity}`
      },
      {
        id: 'status',
        header: t`Status`,
        cell: ({ row }) => {
          const status = row.original.status;

          return status ? (
            <Badge variant={getStatusBadgeVariant(status)}>{groupStatusLabelMap[status]}</Badge>
          ) : (
            '-'
          );
        }
      },
      {
        id: 'active',
        header: t`Activity`,
        cell: ({ row }) => (
          <Badge variant={row.original.active ? 'success' : 'secondary'}>
            {row.original.active ? t`Active` : t`Inactive`}
          </Badge>
        )
      }
    ],
    [t]
  );
};
