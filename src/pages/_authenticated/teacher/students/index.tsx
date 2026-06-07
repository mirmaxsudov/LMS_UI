import { createFileRoute } from '@tanstack/react-router';

const TeacherStudentsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Students</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/students/')({
  component: TeacherStudentsRoutePage
});
