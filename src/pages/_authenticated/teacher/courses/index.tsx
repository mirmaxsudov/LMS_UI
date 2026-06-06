import { createFileRoute } from '@tanstack/react-router';

const TeacherCoursesRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Courses</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/courses/')({
  component: TeacherCoursesRoutePage
});
