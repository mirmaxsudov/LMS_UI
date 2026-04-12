import { createFileRoute } from '@tanstack/react-router';

import { StudentsPage } from '@/modules/users';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

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
