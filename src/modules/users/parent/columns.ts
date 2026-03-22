import type { ColumnDef } from '@tanstack/react-table';

const getFullName = (parent: Parent) =>
  [parent.baseData.firstName, parent.baseData.middleName, parent.baseData.lastName]
    .filter(Boolean)
    .join(' ');

export const parentColumns: ColumnDef<Parent>[] = [
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
    id: 'email',
    header: 'Email',
    accessorFn: (row) => row.baseData.email
  },
  {
    id: 'studentsCount',
    header: 'Children',
    accessorKey: 'studentsCount'
  }
];

