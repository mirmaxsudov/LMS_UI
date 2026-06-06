import { createFileRoute } from '@tanstack/react-router';

const StudentDashboardRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Student dashboard</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/student/dashboard/')({
  component: StudentDashboardRoutePage
});
