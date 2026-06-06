import { createFileRoute } from '@tanstack/react-router';

const TeacherProgressRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Teaching progress</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/progress/')({
  component: TeacherProgressRoutePage
});
