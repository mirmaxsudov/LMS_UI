import type { ColumnDef } from '@tanstack/react-table';

const getFullName = (student: Student) =>
  [student.baseData.firstName, student.baseData.middleName, student.baseData.lastName]
    .filter(Boolean)
    .join(' ');

export const studentColumns: ColumnDef<Student>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorFn: (row) => getFullName(row)
  },
  {
    id: 'studentId',
    header: 'Student ID',
    accessorKey: 'studentId'
  },
  {
    id: 'grade',
    header: 'Grade',
    accessorFn: (row) => (row as Student & { grade?: string }).grade ?? '-'
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status'
  },
  {
    id: 'phone',
    header: 'Phone',
    accessorFn: (row) => row.baseData.phoneNumber ?? '-'
  }
];
