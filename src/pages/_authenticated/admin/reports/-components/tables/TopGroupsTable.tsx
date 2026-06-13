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

import type { TopGroupStatus } from '../types';

import { topGroups } from '../mock-data';

const statusVariant: Record<TopGroupStatus, 'outline' | 'secondary' | 'success'> = {
  active: 'success',
  completed: 'secondary',
  paused: 'outline'
};

export const TopGroupsTable = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Top performing groups</CardTitle>
        <CardDescription>Ranked by average score this term</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className='text-right'>Students</TableHead>
              <TableHead className='text-right'>Avg. score</TableHead>
              <TableHead className='text-right'>Attendance</TableHead>
              <TableHead className='text-right'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className='font-medium'>{group.name}</TableCell>
                <TableCell className='text-muted-foreground'>{group.course}</TableCell>
                <TableCell className='text-right'>{group.students}</TableCell>
                <TableCell className='text-right'>{group.averageScore}%</TableCell>
                <TableCell className='text-right'>{group.attendanceRate}%</TableCell>
                <TableCell className='text-right'>
                  <Badge className='capitalize' variant={statusVariant[group.status]}>
                    {group.status}
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
