import { createFileRoute } from '@tanstack/react-router';

const ParentChildrenAttendanceRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Children attendance</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/children-attendance/')({
  component: ParentChildrenAttendanceRoutePage
});
