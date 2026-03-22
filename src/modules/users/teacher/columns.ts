import type { ColumnDef } from '@tanstack/react-table';

const getFullName = (teacher: Teacher) =>
  [teacher.baseData.firstName, teacher.baseData.middleName, teacher.baseData.lastName]
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
    accessorFn: (row) => row.baseData.phoneNumber ?? '-'
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
    accessorFn: (row) => row.baseData.status
  }
];

