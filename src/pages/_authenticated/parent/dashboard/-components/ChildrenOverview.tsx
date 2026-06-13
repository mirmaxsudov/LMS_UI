import type { CSSProperties } from 'react';

import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import { children } from './mock-data';

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const ChildrenOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your children</CardTitle>
        <CardDescription>Quick snapshot of each child&#39;s progress this term</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {children.map((child) => (
            <div key={child.id} className='flex flex-col gap-4 rounded-lg border p-4'>
              <div className='flex items-center gap-3'>
                <Avatar className='size-11' style={{ backgroundColor: `${child.color}1a` }}>
                  <AvatarFallback
                    className='font-semibold'
                    style={{ backgroundColor: 'transparent', color: child.color }}
                  >
                    {getInitials(child.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-semibold'>{child.name}</p>
                  <p className='text-muted-foreground text-xs'>{child.grade}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3 text-sm'>
                <div>
                  <p className='text-muted-foreground text-xs'>Attendance</p>
                  <p className='font-semibold'>{child.attendanceRate}%</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-xs'>Average score</p>
                  <p className='font-semibold'>{child.averageScore}%</p>
                </div>
              </div>

              <div className='space-y-1.5'>
                <div className='flex items-center justify-between text-xs'>
                  <span className='text-muted-foreground'>Term progress</span>
                  <span className='font-medium'>{child.overallProgress}%</span>
                </div>
                <Progress
                  className='[&>div]:bg-(--child-color)'
                  style={{ '--child-color': child.color } as CSSProperties}
                  value={child.overallProgress}
                />
              </div>

              <div className='mt-auto flex items-center justify-between gap-2'>
                <Badge
                  className={cn(child.pendingAssignments === 0 && 'opacity-0')}
                  variant='outline'
                >
                  {child.pendingAssignments} pending task
                  {child.pendingAssignments === 1 ? '' : 's'}
                </Badge>
                <Button asChild size='sm' variant='ghost'>
                  <Link to='/parent/children-progress'>
                    View details
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
