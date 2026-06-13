import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { ChildrenProgressDashboard } from './-components/ChildrenProgressDashboard';

const ParentChildrenProgressRoutePage = () => (
  <>
    <PageHeader />
    <ChildrenProgressDashboard />
  </>
);

export const Route = createFileRoute('/_authenticated/parent/children-progress/')({
  component: ParentChildrenProgressRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
