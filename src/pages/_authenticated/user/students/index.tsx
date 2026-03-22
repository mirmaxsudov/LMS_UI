import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { StudentsPage } from '../../../../modules/users/student/components/StudentsPage.tsx';

const StudentsRoutePage = () => (
  <>
    <PageHeader />
    <StudentsPage />
  </>
);

export const Route = createFileRoute('/_authenticated/user/students/')({
  component: StudentsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
