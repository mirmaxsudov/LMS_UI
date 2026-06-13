import { ClipboardCheckIcon, FileTextIcon, FlaskConicalIcon, PencilLineIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import type { GradingStatus, GradingType } from './types';

import { pendingGrading } from './mock-data';

const typeIcon: Record<GradingType, typeof FileTextIcon> = {
  homework: PencilLineIcon,
  quiz: ClipboardCheckIcon,
  project: FileTextIcon,
  exam: FlaskConicalIcon
};

const typeLabel: Record<GradingType, string> = {
  homework: 'Homework',
  quiz: 'Quiz',
  project: 'Project',
  exam: 'Exam'
};

const statusLabel: Record<GradingStatus, string> = {
  pending: 'Pending',
  overdue: 'Overdue'
};

const statusVariant: Record<GradingStatus, 'destructive' | 'outline'> = {
  pending: 'outline',
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

export const PendingGradingCard = () => {
  const overdueCount = pendingGrading.filter((item) => item.status === 'overdue').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending grading</CardTitle>
        <CardDescription>
          {pendingGrading.length} submissions waiting · {overdueCount} overdue
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        {pendingGrading.map((item) => {
          const Icon = typeIcon[item.type];

          return (
            <div
              key={item.id}
              className='flex items-center justify-between gap-4 rounded-lg border p-3'
            >
              <div className='flex items-center gap-3'>
                <div
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-lg',
                    item.status === 'overdue'
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-primary/10 text-primary'
                  )}
                >
                  <Icon className='size-4' />
                </div>
                <div>
                  <p className='text-sm font-medium'>{item.title}</p>
                  <p className='text-muted-foreground text-xs'>
                    {item.group} · {typeLabel[item.type]} · {formatDueDate(item.dueDate)}
                  </p>
                </div>
              </div>
              <div className='flex shrink-0 items-center gap-2'>
                <span className='text-muted-foreground text-sm'>
                  {item.submittedCount}/{item.totalCount}
                </span>
                <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
