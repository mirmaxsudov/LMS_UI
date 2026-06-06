import { createFileRoute } from '@tanstack/react-router';

const TeacherGroupsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>My groups</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/groups/')({
  component: TeacherGroupsRoutePage
});
