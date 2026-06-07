import { createFileRoute } from '@tanstack/react-router';

const ParentChildrenQuizzesRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Children quizzes</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/children-quizzes/')({
  component: ParentChildrenQuizzesRoutePage
});
