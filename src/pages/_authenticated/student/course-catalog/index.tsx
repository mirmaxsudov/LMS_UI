import { createFileRoute } from '@tanstack/react-router';

const StudentCourseCatalogRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Course catalog</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/student/course-catalog/')({
  component: StudentCourseCatalogRoutePage
});
