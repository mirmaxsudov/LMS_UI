import { createFileRoute } from '@tanstack/react-router';

import { AnnouncementsView } from '@/modules/announcement';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const TeacherAnnouncementsRoutePage = () => (
  <>
    <PageHeader />
    <AnnouncementsView />
  </>
);

export const Route = createFileRoute('/_authenticated/teacher/announcements/')({
  component: TeacherAnnouncementsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
