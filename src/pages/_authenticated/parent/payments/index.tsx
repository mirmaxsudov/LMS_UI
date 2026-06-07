import { createFileRoute } from '@tanstack/react-router';

const ParentPaymentsRoutePage = () => (
  <div className='p-6'>
    <h1 className='text-2xl font-semibold'>Payments</h1>
  </div>
);

export const Route = createFileRoute('/_authenticated/parent/payments/')({
  component: ParentPaymentsRoutePage
});
