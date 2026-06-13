import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/ui/table';

import type { PaymentStatus } from '../types';

import { outstandingPayments } from '../mock-data';

const statusVariant: Record<PaymentStatus, 'destructive' | 'outline'> = {
  overdue: 'destructive',
  pending: 'outline'
};

const formatAmount = (value: number) =>
  new Intl.NumberFormat('en-US').format(value);

export const OutstandingPaymentsTable = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Outstanding payments</CardTitle>
        <CardDescription>Students with pending or overdue tuition</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Group</TableHead>
              <TableHead className='text-right'>Amount (UZS)</TableHead>
              <TableHead className='text-right'>Due date</TableHead>
              <TableHead className='text-right'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outstandingPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Avatar className='size-8'>
                      <AvatarFallback>{payment.initials}</AvatarFallback>
                    </Avatar>
                    <span className='font-medium'>{payment.student}</span>
                  </div>
                </TableCell>
                <TableCell className='text-muted-foreground'>{payment.group}</TableCell>
                <TableCell className='text-right'>{formatAmount(payment.amount)}</TableCell>
                <TableCell className='text-right'>
                  {new Date(payment.dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </TableCell>
                <TableCell className='text-right'>
                  <Badge className='capitalize' variant={statusVariant[payment.status]}>
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
