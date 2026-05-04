import { createFileRoute } from '@tanstack/react-router';

import { CourseSectionsPage } from '@/modules/course-section';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const CourseSectionsRoutePage = () => (
  <>
    <PageHeader />
    <CourseSectionsPage />
  </>
);

export const Route = createFileRoute('/_authenticated/course-sections/')({
  component: CourseSectionsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
