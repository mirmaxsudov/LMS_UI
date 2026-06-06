import { createFileRoute } from '@tanstack/react-router';

const StudentLessonsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Lessons</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/student/lessons/')({
  component: StudentLessonsRoutePage
});
