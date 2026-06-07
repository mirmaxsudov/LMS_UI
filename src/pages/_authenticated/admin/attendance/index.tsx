import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

const AttendanceRoutePage = () => (
  <>
    <PageHeader />
    <div className='p-6'>
      <h1 className='text-2xl font-semibold'>Attendance</h1>
    </div>
  </>
);

export const Route = createFileRoute('/_authenticated/admin/attendance/')({
  component: AttendanceRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
