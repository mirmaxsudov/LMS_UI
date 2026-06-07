import { createFileRoute } from '@tanstack/react-router';

const TeacherAssignmentsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Assignments</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/assignments/')({
  component: TeacherAssignmentsRoutePage
});
