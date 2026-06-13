import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import type { AttendanceRecordStatus } from './types';

import { attendanceHistory } from './mock-data';

const statusLabel: Record<AttendanceRecordStatus, string> = {
  present: 'Present',
  late: 'Late',
  absent: 'Absent',
  excused: 'Excused'
};

const statusVariant: Record<
  AttendanceRecordStatus,
  'default' | 'destructive' | 'outline' | 'success'
> = {
  present: 'success',
  late: 'default',
  absent: 'destructive',
  excused: 'outline'
};

export const AttendanceHistoryTable = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Attendance history</CardTitle>
        <CardDescription>Most recent lesson sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Lesson</TableHead>
              <TableHead className='text-right'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell className='text-muted-foreground whitespace-nowrap'>
                  {new Date(record.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </TableCell>
                <TableCell className='font-medium whitespace-nowrap'>{record.subject}</TableCell>
                <TableCell className='text-muted-foreground'>{record.topic}</TableCell>
                <TableCell className='text-right'>
                  <Badge variant={statusVariant[record.status]}>{statusLabel[record.status]}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
