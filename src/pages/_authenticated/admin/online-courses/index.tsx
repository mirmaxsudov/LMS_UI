import { createFileRoute } from '@tanstack/react-router';

import { OnlineCoursesPage } from '@/modules/online-course';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const OnlineCoursesRoutePage = () => (
  <>
    <PageHeader />
    <OnlineCoursesPage />
  </>
);

export const Route = createFileRoute('/_authenticated/admin/online-courses/')({
  component: OnlineCoursesRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
