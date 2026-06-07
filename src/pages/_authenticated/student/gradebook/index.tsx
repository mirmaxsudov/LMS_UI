import { createFileRoute } from '@tanstack/react-router';

const StudentGradebookRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Gradebook</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/student/gradebook/')({
  component: StudentGradebookRoutePage
});
