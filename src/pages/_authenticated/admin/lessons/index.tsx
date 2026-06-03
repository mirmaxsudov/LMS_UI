import { createFileRoute } from '@tanstack/react-router';

import { LessonsPage } from '@/modules/lesson';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const LessonsRoutePage = () => (
  <>
    <PageHeader />
    <LessonsPage />
  </>
);

export const Route = createFileRoute('/_authenticated/admin/lessons/')({
  component: LessonsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
