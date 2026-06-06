import { createFileRoute } from '@tanstack/react-router';

const ParentSettingsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Parent settings</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/settings/')({
  component: ParentSettingsRoutePage
});
