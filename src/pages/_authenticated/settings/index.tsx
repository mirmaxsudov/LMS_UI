import { createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/modules/auth';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageContent, PageHeader, PageLoading } from '@/shared/ui/page';

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <>
      <PageHeader />
      <PageContent></PageContent>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
