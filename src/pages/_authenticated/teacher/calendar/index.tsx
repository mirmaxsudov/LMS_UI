import { createFileRoute } from '@tanstack/react-router';

const TeacherCalendarRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Calendar</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/calendar/')({
  component: TeacherCalendarRoutePage
});
