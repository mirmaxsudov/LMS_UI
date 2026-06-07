import { createFileRoute } from '@tanstack/react-router';

const ParentChildrenMaterialsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Children materials</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/children-materials/')({
  component: ParentChildrenMaterialsRoutePage
});
