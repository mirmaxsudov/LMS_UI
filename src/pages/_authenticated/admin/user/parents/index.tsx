import { createFileRoute } from '@tanstack/react-router';

import { ParentsPage } from '@/modules/users';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const ParentsRoutePage = () => (
  <>
    <PageHeader />
    <ParentsPage />
  </>
);

export const Route = createFileRoute('/_authenticated/admin/user/parents/')({
  component: ParentsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
