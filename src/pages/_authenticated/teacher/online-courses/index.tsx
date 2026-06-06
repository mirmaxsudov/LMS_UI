import { createFileRoute } from '@tanstack/react-router';

const TeacherOnlineCoursesRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Online courses</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/online-courses/')({
  component: TeacherOnlineCoursesRoutePage
});
