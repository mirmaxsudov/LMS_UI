import { createFileRoute } from '@tanstack/react-router';

const StudentStudyGroupsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Study groups</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/student/study-groups/')({
  component: StudentStudyGroupsRoutePage
});
