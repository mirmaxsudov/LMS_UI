import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const QuizzesRoutePage = () => (
  <>
    <PageHeader />
    <div className='p-6'>
      <h1 className='text-2xl font-semibold'>Quizzes</h1>
    </div>
  </>
);

export const Route = createFileRoute('/_authenticated/admin/quizzes/')({
  component: QuizzesRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
