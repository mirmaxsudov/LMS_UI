import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';

import type { PaymentStatus } from './types';

import { overviewStat, pendingPayments } from './mock-data';

const statusLabel: Record<PaymentStatus, string> = {
  pending: 'Pending',
  paid: 'Paid',
  overdue: 'Overdue'
};

const statusVariant: Record<PaymentStatus, 'destructive' | 'outline' | 'success'> = {
  pending: 'outline',
  paid: 'success',
  overdue: 'destructive'
};

const formatAmount = (amount: number) => `${amount.toLocaleString('en-US')} UZS`;

export const PaymentsOverviewCard = () => {
  return (
    <Card className='flex h-full flex-col'>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <CardDescription>
          {formatAmount(overviewStat.pendingPaymentsAmount)} due across{' '}
          {overviewStat.pendingPaymentsCount} invoices
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 space-y-2'>
        {pendingPayments.map((payment) => (
          <div
            key={payment.id}
            className='flex items-center justify-between gap-3 rounded-lg border p-3'
          >
            <div className='space-y-0.5'>
              <p className='text-sm font-medium'>{payment.description}</p>
              <p className='text-muted-foreground text-xs'>
                {payment.childName} ·{' '}
                {payment.status === 'paid'
                  ? `Paid ${new Date(payment.paidDate ?? payment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                  : `Due ${new Date(payment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              </p>
            </div>
            <div className='flex shrink-0 flex-col items-end gap-1'>
              <span className='text-sm font-semibold'>{formatAmount(payment.amount)}</span>
              <Badge variant={statusVariant[payment.status]}>{statusLabel[payment.status]}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild className='w-full' variant='outline'>
          <Link to='/parent/payments'>
            View all payments
            <ArrowRightIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
