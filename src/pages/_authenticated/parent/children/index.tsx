import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { ParentChildrenPage } from './-components/ParentChildrenPage';

const ParentChildrenRoutePage = () => (
  <>
    <PageHeader />
    <ParentChildrenPage />
  </>
);

export const Route = createFileRoute('/_authenticated/parent/children/')({
  component: ParentChildrenRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
