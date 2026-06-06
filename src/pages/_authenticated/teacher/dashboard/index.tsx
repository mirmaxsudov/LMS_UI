import { createFileRoute } from '@tanstack/react-router';

const TeacherDashboardRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Teacher dashboard</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/dashboard/')({
  component: TeacherDashboardRoutePage
});
