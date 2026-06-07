import { createFileRoute } from '@tanstack/react-router';

import { SchedulesPage } from '@/modules/schedule';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const SchedulesRoutePage = () => (
  <>
    <PageHeader />
    <SchedulesPage />
  </>
);

export const Route = createFileRoute('/_authenticated/admin/schedule/')({
  component: SchedulesRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
