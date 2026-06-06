import { createFileRoute } from '@tanstack/react-router';

const StudentOnlineCoursesRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Online courses</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/student/online-courses/')({
  component: StudentOnlineCoursesRoutePage
});
