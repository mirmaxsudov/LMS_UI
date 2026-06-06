import { createFileRoute } from '@tanstack/react-router';

const StudentProgressRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>My progress</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/student/progress/')({
  component: StudentProgressRoutePage
});
