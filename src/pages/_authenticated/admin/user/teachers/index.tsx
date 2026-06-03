import { createFileRoute } from '@tanstack/react-router';

import { TeachersPage } from '@/modules/users';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const TeachersRoutePage = () => (
  <>
    <PageHeader />
    <TeachersPage />
  </>
);

export const Route = createFileRoute('/_authenticated/admin/user/teachers/')({
  component: TeachersRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
