import { createFileRoute } from '@tanstack/react-router';

const StudentSettingsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Student settings</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/student/settings/')({
  component: StudentSettingsRoutePage
});
