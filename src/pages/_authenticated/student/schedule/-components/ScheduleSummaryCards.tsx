import type { LucideIcon } from 'lucide-react';

import { CalendarRangeIcon, ClockIcon, HourglassIcon, LayersIcon } from 'lucide-react';

import { Card, CardContent } from '@/shared/ui/card';

import { formatTime } from './utils';

interface SummaryItem {
  hint: string;
  icon: LucideIcon;
  label: string;
  value: string;
}

interface ScheduleSummaryCardsProps {
  summary: StudentScheduleSummary;
  weekRangeLabel: string;
}

export const ScheduleSummaryCards = ({ summary, weekRangeLabel }: ScheduleSummaryCardsProps) => {
  const { nextClass } = summary;

  const items: SummaryItem[] = [
    {
      icon: CalendarRangeIcon,
      label: 'This week',
      value: weekRangeLabel,
      hint: 'Current week'
    },
    {
      icon: LayersIcon,
      label: 'Total classes',
      value: `${summary.totalClasses}`,
      hint: 'Across the week'
    },
    {
      icon: HourglassIcon,
      label: 'Study hours',
      value: `${summary.totalHours}h`,
      hint: 'Scheduled time'
    },
    {
      icon: ClockIcon,
      label: 'Next class',
      value: nextClass ? nextClass.subject : '—',
      hint: nextClass
        ? `${nextClass.dayLabel} at ${formatTime(nextClass.startTime)}`
        : 'No upcoming class'
    }
  ];

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className='flex items-start justify-between gap-4'>
            <div className='min-w-0 space-y-1'>
              <p className='text-muted-foreground text-sm'>{item.label}</p>
              <p className='truncate text-xl font-semibold'>{item.value}</p>
              <p className='text-muted-foreground truncate text-xs'>{item.hint}</p>
            </div>
            <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg'>
              <item.icon className='size-5' />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
