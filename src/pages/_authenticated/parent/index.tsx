import { createFileRoute } from '@tanstack/react-router';

const ParentRoutePage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold'>Parent dashboard</h1>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/parent/')({
  component: ParentRoutePage
});
