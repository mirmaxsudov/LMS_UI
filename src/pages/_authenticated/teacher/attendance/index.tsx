import { createFileRoute } from '@tanstack/react-router';

const TeacherAttendanceRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Attendance</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/attendance/')({
  component: TeacherAttendanceRoutePage
});
