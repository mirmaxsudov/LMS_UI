import { createFileRoute } from '@tanstack/react-router';

const TeacherMaterialsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Materials</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/teacher/materials/')({
  component: TeacherMaterialsRoutePage
});
