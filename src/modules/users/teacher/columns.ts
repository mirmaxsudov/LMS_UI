import type { ColumnDef } from '@tanstack/react-table';

const getFullName = (teacher: Teacher) =>
  [teacher.user.firstName, teacher.user.middleName, teacher.user.lastName]
    .filter(Boolean)
    .join(' ');

export const teacherColumns: ColumnDef<Teacher>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorFn: (row) => getFullName(row)
  },
  {
    id: 'phone',
    header: 'Phone',
    accessorFn: (row) => row.user.phoneNumber ?? '-'
  },
  {
    id: 'subject',
    header: 'Subject',
    accessorFn: (row) => (row as Teacher & { subject?: string }).subject ?? '-'
  },
  {
    id: 'position',
    header: 'Position',
    accessorKey: 'position'
  },
  {
    id: 'status',
    header: 'Status',
    accessorFn: (row) => row.user.status
  }
];
