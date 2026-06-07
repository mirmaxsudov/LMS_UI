import { createFileRoute } from '@tanstack/react-router';

const TeacherMessagesRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Messages</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/messages/')({
  component: TeacherMessagesRoutePage
});
