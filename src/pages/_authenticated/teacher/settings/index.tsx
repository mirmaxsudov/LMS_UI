import { createFileRoute } from '@tanstack/react-router';

const TeacherSettingsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Teacher settings</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/settings/')({
  component: TeacherSettingsRoutePage
});
