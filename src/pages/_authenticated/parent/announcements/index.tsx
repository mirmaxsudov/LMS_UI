import { createFileRoute } from '@tanstack/react-router';

import { AnnouncementsView } from '@/modules/announcement';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const ParentAnnouncementsRoutePage = () => (
  <>
    <PageHeader />
    <AnnouncementsView />
  </>
);

export const Route = createFileRoute('/_authenticated/parent/announcements/')({
  component: ParentAnnouncementsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
