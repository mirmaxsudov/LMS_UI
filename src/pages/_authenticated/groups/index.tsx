import { createFileRoute } from '@tanstack/react-router';

import { GroupsPage } from '@/modules/group';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const GroupsRoutePage = () => {
  return (
    <>
      <PageHeader />
      <GroupsPage />
    </>
  );
};

export const Route = createFileRoute('/_authenticated/groups/')({
  component: GroupsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
