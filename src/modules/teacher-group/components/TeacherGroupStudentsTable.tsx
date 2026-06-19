import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/shared/ui/data-table';

import { useTeacherGroupStudentColumns } from '../columns';

interface TeacherGroupStudentsTableProps {
  isLoading: boolean;
  students: TeacherGroupStudent[];
}

export const TeacherGroupStudentsTable = ({ students, isLoading }: TeacherGroupStudentsTableProps) => {
  const columns = useTeacherGroupStudentColumns();

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div className='overflow-x-auto'>
      <DataTable
        className='w-max min-w-full'
        table={table}
        isLoading={isLoading}
        loadingOptions={{ columnCount: columns.length }}
      />
    </div>
  );
};
