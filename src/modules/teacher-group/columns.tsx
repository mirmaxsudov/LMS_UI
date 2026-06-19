import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';

import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

import { StatusPill } from './components/StatusPill';
import {
  teacherGroupPaymentStatusColorMap,
  teacherGroupPaymentStatusLabelMap,
  teacherGroupStudentStatusColorMap,
  teacherGroupStudentStatusLabelMap
} from './constants';
import { formatDate, getFullName, getInitials } from './lib/format';

const gradeColor = (grade: number) => {
  if (grade >= 80) return 'text-success';
  if (grade >= 60) return 'text-pending-foreground';

  return 'text-destructive';
};

export const useTeacherGroupStudentColumns = (): ColumnDef<TeacherGroupStudent>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'student',
        header: t`Student`,
        cell: ({ row }) => {
          const student = row.original;

          return (
            <div className='flex items-center gap-3'>
              <Avatar className='size-8'>
                {student.profileImageUrl && <AvatarImage src={student.profileImageUrl} />}
                <AvatarFallback className='text-xs'>
                  {getInitials(student.firstName, student.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0'>
                <p className='truncate font-medium'>
                  {getFullName(student.firstName, student.lastName)}
                </p>
                <p className='text-muted-foreground truncate text-xs'>{student.email}</p>
              </div>
            </div>
          );
        }
      },
      {
        id: 'phoneNumber',
        header: t`Phone`,
        accessorKey: 'phoneNumber',
        cell: ({ row }) => (
          <span className='text-muted-foreground whitespace-nowrap'>
            {row.original.phoneNumber}
          </span>
        )
      },
      {
        id: 'status',
        header: t`Status`,
        cell: ({ row }) => (
          <StatusPill
            label={t(teacherGroupStudentStatusLabelMap[row.original.status])}
            color={teacherGroupStudentStatusColorMap[row.original.status]}
          />
        )
      },
      {
        id: 'attendanceRate',
        header: t`Attendance`,
        accessorKey: 'attendanceRate',
        cell: ({ row }) => (
          <span className='tabular-nums whitespace-nowrap'>{row.original.attendanceRate}%</span>
        )
      },
      {
        id: 'averageGrade',
        header: t`Avg. grade`,
        accessorKey: 'averageGrade',
        cell: ({ row }) => (
          <span className={cn('font-medium tabular-nums', gradeColor(row.original.averageGrade))}>
            {row.original.averageGrade}
          </span>
        )
      },
      {
        id: 'paymentStatus',
        header: t`Payment`,
        cell: ({ row }) => (
          <StatusPill
            label={t(teacherGroupPaymentStatusLabelMap[row.original.paymentStatus])}
            color={teacherGroupPaymentStatusColorMap[row.original.paymentStatus]}
          />
        )
      },
      {
        id: 'enrolledAt',
        header: t`Enrolled`,
        accessorKey: 'enrolledAt',
        cell: ({ row }) => (
          <span className='text-muted-foreground whitespace-nowrap'>
            {formatDate(row.original.enrolledAt)}
          </span>
        )
      }
    ],
    [t]
  );
};
