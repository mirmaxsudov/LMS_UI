import { createFileRoute } from '@tanstack/react-router';

import { CoursesPage } from '@/modules/course';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const CoursesRoutePage = () => (
  <>
    <PageHeader />
    <CoursesPage />
  </>
);

export const Route = createFileRoute('/_authenticated/admin/courses/')({
  component: CoursesRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
