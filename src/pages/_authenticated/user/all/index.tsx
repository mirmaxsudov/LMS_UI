import { createFileRoute } from '@tanstack/react-router';

import { AllUsersPage } from '@/modules/users';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const AllUsersRoutePage = () => (
  <>
    <PageHeader />
    <AllUsersPage />
  </>
);

export const Route = createFileRoute('/_authenticated/user/all/')({
  component: AllUsersRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
