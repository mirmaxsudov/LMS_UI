import { createFileRoute } from '@tanstack/react-router';

import { RoomsPage } from '@/modules/room';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageLoading } from '@/shared/ui/page';

export const Route = createFileRoute('/_authenticated/admin/rooms/')({
  component: RoomsPage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
