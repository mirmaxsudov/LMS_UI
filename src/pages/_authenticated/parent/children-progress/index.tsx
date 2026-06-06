import { createFileRoute } from '@tanstack/react-router';

const ParentChildrenProgressRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Children progress</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/children-progress/')({
  component: ParentChildrenProgressRoutePage
});
