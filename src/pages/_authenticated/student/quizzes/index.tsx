import { createFileRoute } from '@tanstack/react-router';

const StudentQuizzesRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Quizzes</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/student/quizzes/')({
  component: StudentQuizzesRoutePage
});
