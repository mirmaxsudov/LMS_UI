import { createFileRoute } from '@tanstack/react-router';

import { AnnouncementsPage } from '@/modules/announcement';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const AnnouncementsRoutePage = () => (
  <>
    <PageHeader />
    <AnnouncementsPage />
  </>
);

export const Route = createFileRoute('/_authenticated/admin/announcements/')({
  component: AnnouncementsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
