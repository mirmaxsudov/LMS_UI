import { createFileRoute } from '@tanstack/react-router';

const ParentChildrenRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>My children</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/children/')({
  component: ParentChildrenRoutePage
});
