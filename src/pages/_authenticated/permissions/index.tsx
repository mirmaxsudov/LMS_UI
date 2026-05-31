import { createFileRoute } from '@tanstack/react-router';

import { PermissionsPage } from '@/modules/permission';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const PermissionsRoutePage = () => (
  <>
    <PageHeader />
    <PermissionsPage />
  </>
);

export const Route = createFileRoute('/_authenticated/permissions/')({
  component: PermissionsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
