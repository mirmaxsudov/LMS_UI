import { createFileRoute } from '@tanstack/react-router';

import { AnnouncementsView } from '@/modules/announcement';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const StudentAnnouncementsRoutePage = () => (
  <>
    <PageHeader />
    <AnnouncementsView />
  </>
);

export const Route = createFileRoute('/_authenticated/student/announcements/')({
  component: StudentAnnouncementsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
