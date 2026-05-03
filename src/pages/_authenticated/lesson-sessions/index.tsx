import { createFileRoute } from '@tanstack/react-router';

import { LessonSessionsPage } from '@/modules/lesson-session';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const LessonSessionsRoutePage = () => (
  <>
    <PageHeader />
    <LessonSessionsPage />
  </>
);

export const Route = createFileRoute('/_authenticated/lesson-sessions/')({
  component: LessonSessionsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
