import { createFileRoute } from '@tanstack/react-router';

const ParentMeetingsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Meetings</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/meetings/')({
  component: ParentMeetingsRoutePage
});
