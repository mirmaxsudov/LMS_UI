import { createFileRoute } from '@tanstack/react-router';

const ParentCalendarRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Calendar</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/calendar/')({
  component: ParentCalendarRoutePage
});
