import { ClipboardCheckIcon, FileTextIcon, FlaskConicalIcon, PencilLineIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import { upcomingAssignments } from './mock-data';
import type { AssignmentStatus, AssignmentType } from './types';

const typeIcon: Record<AssignmentType, typeof FileTextIcon> = {
  homework: PencilLineIcon,
  quiz: ClipboardCheckIcon,
  project: FileTextIcon,
  exam: FlaskConicalIcon
};

const typeLabel: Record<AssignmentType, string> = {
  homework: 'Homework',
  quiz: 'Quiz',
  project: 'Project',
  exam: 'Exam'
};

const statusLabel: Record<AssignmentStatus, string> = {
  pending: 'Pending',
  submitted: 'Submitted',
  graded: 'Graded',
  overdue: 'Overdue'
};

const statusVariant: Record<AssignmentStatus, 'default' | 'destructive' | 'outline' | 'success'> = {
  pending: 'outline',
  submitted: 'default',
  graded: 'success',
  overdue: 'destructive'
};

const formatDueDate = (dueDate: string) => {
  const date = new Date(dueDate);
  const today = new Date('2026-06-13');
  const diffDays = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (diffDays === 0) return `${formatted} · Due today`;
  if (diffDays === 1) return `${formatted} · Due tomorrow`;
  if (diffDays > 1) return `${formatted} · In ${diffDays} days`;
  if (diffDays === -1) return `${formatted} · 1 day overdue`;
  return `${formatted} · ${Math.abs(diffDays)} days overdue`;
};

export const UpcomingAssignmentsCard = () => {
  const pendingCount = upcomingAssignments.filter(
    (item) => item.status === 'pending' || item.status === 'overdue'
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments &amp; deadlines</CardTitle>
        <CardDescription>{pendingCount} items need your attention</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        {upcomingAssignments.map((assignment) => {
          const Icon = typeIcon[assignment.type];

          return (
            <div
              key={assignment.id}
              className='flex items-center justify-between gap-4 rounded-lg border p-3'
            >
              <div className='flex items-center gap-3'>
                <div
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-lg',
                    assignment.status === 'overdue'
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-primary/10 text-primary'
                  )}
                >
                  <Icon className='size-4' />
                </div>
                <div>
                  <p className='text-sm font-medium'>{assignment.title}</p>
                  <p className='text-muted-foreground text-xs'>
                    {assignment.subject} · {typeLabel[assignment.type]} ·{' '}
                    {formatDueDate(assignment.dueDate)}
                  </p>
                </div>
              </div>
              <div className='flex shrink-0 items-center gap-2'>
                {assignment.status === 'graded' && assignment.score !== undefined && (
                  <span className='text-muted-foreground text-sm'>
                    {assignment.score}/{assignment.maxScore}
                  </span>
                )}
                <Badge variant={statusVariant[assignment.status]}>
                  {statusLabel[assignment.status]}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
