import { createFileRoute } from '@tanstack/react-router';

const StudentRoutePage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold'>Student dashboard</h1>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/student/')({
  component: StudentRoutePage
});
