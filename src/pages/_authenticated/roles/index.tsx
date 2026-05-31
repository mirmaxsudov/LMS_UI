import { createFileRoute } from '@tanstack/react-router';

import { RolesPage } from '@/modules/role';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const RolesRoutePage = () => (
  <>
    <PageHeader />
    <RolesPage />
  </>
);

export const Route = createFileRoute('/_authenticated/roles/')({
  component: RolesRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
