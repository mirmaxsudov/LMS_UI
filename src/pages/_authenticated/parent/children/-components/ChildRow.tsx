import { Link } from '@tanstack/react-router';
import {
  BookOpenIcon,
  CalendarClockIcon,
  ChartNoAxesCombinedIcon,
  CheckCircle2Icon,
  EllipsisIcon,
  UserRoundCheckIcon
} from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu';
import { Progress } from '@/shared/ui/progress';

import type { ParentChild } from './types';

interface ChildRowProps {
  child: ParentChild;
}

const Metric = ({
  icon: Icon,
  label,
  value,
  valueClassName
}: {
  icon: typeof UserRoundCheckIcon;
  label: string;
  value: string;
  valueClassName?: string;
}) => (
  <div className='min-w-0'>
    <div className='text-muted-foreground mb-1.5 flex items-center gap-1.5 text-xs font-medium'>
      <Icon className='size-3.5' />
      <span>{label}</span>
    </div>
    <p className={cn('text-base font-semibold tracking-tight', valueClassName)}>{value}</p>
  </div>
);

export const ChildRow = ({ child }: ChildRowProps) => {
  const assignmentProgress = Math.round(
    (child.completedAssignments / child.totalAssignments) * 100
  );

  return (
    <article className='bg-card hover:border-primary/30 group rounded-xl border p-5 shadow-sm transition-[border-color,box-shadow] hover:shadow-md'>
      <div className='flex flex-col gap-5 xl:flex-row xl:items-center'>
        <div className='flex min-w-0 items-start gap-4 xl:w-[26%]'>
          <Avatar className='size-14 rounded-xl'>
            <AvatarFallback
              className={cn('rounded-xl text-base font-semibold', child.accentClassName)}
            >
              {child.initials}
            </AvatarFallback>
          </Avatar>

          <div className='min-w-0'>
            <div className='flex flex-wrap items-center gap-2'>
              <h2 className='truncate text-lg font-semibold tracking-tight'>{child.name}</h2>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                  child.status === 'active'
                    ? 'bg-success/10 text-success'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                )}
              >
                <span className='size-1.5 rounded-full bg-current' />
                {child.status === 'active' ? 'Active' : 'On break'}
              </span>
            </div>
            <p className='text-muted-foreground mt-1 text-sm'>
              {child.grade} · {child.group}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4 border-y py-4 sm:gap-8 xl:w-[29%] xl:border-x xl:border-y-0 xl:px-7 xl:py-0'>
          <Metric
            valueClassName={
              child.attendance >= 90 ? 'text-success' : 'text-amber-600 dark:text-amber-400'
            }
            label='Attendance'
            value={`${child.attendance}%`}
            icon={UserRoundCheckIcon}
          />
          <Metric
            label='Performance'
            value={`${child.performance}%`}
            icon={ChartNoAxesCombinedIcon}
          />
          <Metric label='Courses' value={`${child.courses}`} icon={BookOpenIcon} />
        </div>

        <div className='min-w-0 sm:grid sm:grid-cols-2 sm:gap-8 xl:flex xl:w-[45%] xl:items-center'>
          <div className='min-w-0 sm:border-r sm:pr-8 xl:flex-1'>
            <div className='mb-2 flex items-center justify-between gap-3 text-sm'>
              <span className='font-medium'>Assignments</span>
              <span className='text-muted-foreground text-xs'>
                {child.completedAssignments}/{child.totalAssignments} completed
              </span>
            </div>
            <Progress aria-label={`${assignmentProgress}% completed`} value={assignmentProgress} />
          </div>

          <div className='mt-5 min-w-0 sm:mt-0 xl:flex-1'>
            <div className='text-muted-foreground mb-1.5 flex items-center gap-1.5 text-xs font-medium'>
              <CalendarClockIcon className='size-3.5' />
              Next class
            </div>
            <p className='truncate text-sm font-semibold'>{child.nextClass.subject}</p>
            <p className='text-muted-foreground mt-0.5 truncate text-xs'>
              {child.nextClass.date}, {child.nextClass.time} · {child.nextClass.teacher}
            </p>
          </div>
        </div>
      </div>

      <div className='mt-5 flex items-center justify-between border-t pt-4'>
        <p className='text-muted-foreground hidden items-center gap-1.5 text-xs sm:flex'>
          <CheckCircle2Icon className='text-success size-4' />
          Learning activity is up to date
        </p>
        <div className='ml-auto flex items-center gap-2'>
          <Button asChild size='sm' variant='outline'>
            <Link to='/parent/children-progress'>View progress</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label={`More actions for ${child.name}`} size='icon-sm' variant='ghost'>
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem asChild>
                <Link to='/parent/children-attendance'>View attendance</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to='/parent/children-courses'>View courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to='/parent/children-gradebook'>Open gradebook</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </article>
  );
};
