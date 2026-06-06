import { createFileRoute } from '@tanstack/react-router';

const TeacherLessonSessionsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Lesson sessions</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/lesson-sessions/')({
  component: TeacherLessonSessionsRoutePage
});
