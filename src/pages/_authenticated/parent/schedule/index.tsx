import { createFileRoute } from '@tanstack/react-router';

const ParentScheduleRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Schedule</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/schedule/')({
  component: ParentScheduleRoutePage
});
