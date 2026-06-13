import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import { topStudents } from './mock-data';

export const TopStudentsCard = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Top students</CardTitle>
        <CardDescription>Best performers across your groups this term</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {topStudents.map((student, index) => {
          const isPositive = student.trend >= 0;

          return (
            <div key={student.id} className='flex items-center gap-3'>
              <span className='text-muted-foreground w-4 text-sm font-medium'>{index + 1}</span>
              <Avatar>
                <AvatarFallback>{student.initials}</AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium'>{student.name}</p>
                <p className='text-muted-foreground truncate text-xs'>
                  {student.group} · {student.attendanceRate}% attendance
                </p>
              </div>
              <div className='flex flex-col items-end gap-0.5'>
                <span className='text-sm font-semibold'>{student.averageScore}%</span>
                <span
                  className={cn(
                    'flex items-center gap-0.5 text-xs font-medium',
                    isPositive ? 'text-success' : 'text-destructive'
                  )}
                >
                  {isPositive ? (
                    <TrendingUpIcon className='size-3' />
                  ) : (
                    <TrendingDownIcon className='size-3' />
                  )}
                  {isPositive ? '+' : ''}
                  {student.trend}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
