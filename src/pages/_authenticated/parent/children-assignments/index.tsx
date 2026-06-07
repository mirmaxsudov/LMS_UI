import { createFileRoute } from '@tanstack/react-router';

const ParentChildrenAssignmentsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Children assignments</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/children-assignments/')({
  component: ParentChildrenAssignmentsRoutePage
});
