import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageContent, PageHeader, PageLoading } from '@/shared/ui/page';

const SettingsPage = () => {
  return (
    <>
      <PageHeader />
      <PageContent>Settings page</PageContent>
    </>
  );
};
export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
