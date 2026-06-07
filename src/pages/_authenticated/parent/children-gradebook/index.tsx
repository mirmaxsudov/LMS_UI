import { createFileRoute } from '@tanstack/react-router';

const ParentChildrenGradebookRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Children gradebook</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/children-gradebook/')({
  component: ParentChildrenGradebookRoutePage
});
