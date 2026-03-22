import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { TeachersPage } from '../../../../modules/users/teacher/components/TeachersPage.tsx';

const TeachersRoutePage = () => (
  <>
    <PageHeader />
    <TeachersPage />
  </>
);

export const Route = createFileRoute('/_authenticated/user/teachers/')({
  component: TeachersRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
