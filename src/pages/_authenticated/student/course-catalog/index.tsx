import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { CourseCatalogBrowser } from './-components/CourseCatalogBrowser';

const StudentCourseCatalogRoutePage = () => (
  <>
    <PageHeader />
    <div className='flex flex-col gap-6 p-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Course catalog</h1>
        <p className='text-muted-foreground'>
          Browse available courses and enroll in the ones that fit your goals.
        </p>
      </div>

      <CourseCatalogBrowser />
    </div>
  </>
);

export const Route = createFileRoute('/_authenticated/student/course-catalog/')({
  component: StudentCourseCatalogRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
