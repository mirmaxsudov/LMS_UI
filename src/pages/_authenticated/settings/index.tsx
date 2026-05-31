import { createFileRoute } from '@tanstack/react-router';

import { SettingsPage } from '@/modules/settings';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageLoading } from '@/shared/ui/page';

export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
