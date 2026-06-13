import { StarIcon } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/ui/table';

import { topTeachers } from '../mock-data';

export const TopTeachersTable = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Top teachers</CardTitle>
        <CardDescription>Ranked by average student score this term</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead className='text-right'>Groups</TableHead>
              <TableHead className='text-right'>Students</TableHead>
              <TableHead className='text-right'>Avg. score</TableHead>
              <TableHead className='text-right'>Lessons</TableHead>
              <TableHead className='text-right'>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Avatar className='size-8'>
                      <AvatarFallback>{teacher.initials}</AvatarFallback>
                    </Avatar>
                    <span className='font-medium'>{teacher.name}</span>
                  </div>
                </TableCell>
                <TableCell className='text-right'>{teacher.groups}</TableCell>
                <TableCell className='text-right'>{teacher.students}</TableCell>
                <TableCell className='text-right'>{teacher.averageScore}%</TableCell>
                <TableCell className='text-right'>{teacher.lessonsTaught}</TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-1'>
                    <StarIcon className='size-3.5 fill-current text-yellow-500' />
                    {teacher.rating.toFixed(1)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
