import { createFileRoute } from '@tanstack/react-router';

const ParentNotificationsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Notifications</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/notifications/')({
  component: ParentNotificationsRoutePage
});
