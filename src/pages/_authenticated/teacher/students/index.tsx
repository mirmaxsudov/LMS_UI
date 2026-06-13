import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { StudentsTable } from './-components/StudentsTable';

const TeacherStudentsRoutePage = () => {
  return (
    <>
      <PageHeader />
      <StudentsTable />
    </>
  );
};

export const Route = createFileRoute('/_authenticated/teacher/students/')({
  component: TeacherStudentsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
