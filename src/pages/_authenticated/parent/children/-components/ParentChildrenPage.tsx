import { SearchIcon, TrendingUpIcon, UserRoundCheckIcon, UsersRoundIcon } from 'lucide-react';
import { useDeferredValue, useState } from 'react';

import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

import type { ChildStatus } from './types';

import { ChildRow } from './ChildRow';
import { children } from './mock-data';

type StatusFilter = 'all' | ChildStatus;

const average = (values: number[]) =>
  Math.round(values.reduce((total, value) => total + value, 0) / values.length);

const summaryItems = [
  {
    label: 'Children',
    value: children.length,
    helper: 'Linked to your account',
    icon: UsersRoundIcon,
    iconClassName: 'bg-primary/10 text-primary'
  },
  {
    label: 'Average attendance',
    value: `${average(children.map((child) => child.attendance))}%`,
    helper: 'Across current courses',
    icon: UserRoundCheckIcon,
    iconClassName: 'bg-success/10 text-success'
  },
  {
    label: 'Average performance',
    value: `${average(children.map((child) => child.performance))}%`,
    helper: 'Based on recent grades',
    icon: TrendingUpIcon,
    iconClassName: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
  }
];

export const ParentChildrenPage = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredChildren = children.filter((child) => {
    const matchesQuery =
      child.name.toLowerCase().includes(deferredQuery) ||
      child.grade.toLowerCase().includes(deferredQuery) ||
      child.group.toLowerCase().includes(deferredQuery);
    const matchesStatus = status === 'all' || child.status === status;

    return matchesQuery && matchesStatus;
  });

  return (
    <main className='flex-1 px-4 py-5 sm:px-6 sm:py-6'>
      <div className='mx-auto max-w-[1440px]'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>My children</h1>
            <p className='text-muted-foreground mt-1 text-sm sm:text-base'>
              Follow attendance, learning progress, and upcoming classes in one place.
            </p>
          </div>
          <p className='text-muted-foreground text-sm'>
            {children.length} {children.length === 1 ? 'child' : 'children'} connected
          </p>
        </div>

        <section
          aria-label='Children summary'
          className='bg-card mt-6 grid overflow-hidden rounded-xl border shadow-sm sm:grid-cols-3'
        >
          {summaryItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className='flex items-center gap-4 p-5 sm:px-6 [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-r sm:[&:not(:last-child)]:border-b-0'
              >
                <div
                  className={`grid size-11 shrink-0 place-items-center rounded-xl ${item.iconClassName}`}
                >
                  <Icon className='size-5' />
                </div>
                <div>
                  <p className='text-muted-foreground text-xs font-medium'>{item.label}</p>
                  <p className='mt-0.5 text-xl font-semibold tracking-tight'>{item.value}</p>
                  <p className='text-muted-foreground mt-0.5 text-xs'>{item.helper}</p>
                </div>
              </div>
            );
          })}
        </section>

        <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center'>
          <div className='relative w-full sm:max-w-sm'>
            <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              aria-label='Search children'
              className='bg-card pl-9'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Search by name, grade, or group'
            />
          </div>
          <Select value={status} onValueChange={(value) => setStatus(value as StatusFilter)}>
            <SelectTrigger aria-label='Filter by status' className='bg-card w-full sm:w-44'>
              <SelectValue placeholder='All statuses' />
            </SelectTrigger>
            <SelectContent align='start'>
              <SelectItem value='all'>All statuses</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='on-break'>On break</SelectItem>
            </SelectContent>
          </Select>
          <p className='text-muted-foreground text-sm sm:ml-auto'>
            Showing {filteredChildren.length} of {children.length}
          </p>
        </div>

        <section aria-label='Children list' className='mt-4 space-y-3'>
          {filteredChildren.length > 0 ? (
            filteredChildren.map((child) => <ChildRow key={child.id} child={child} />)
          ) : (
            <div className='bg-card rounded-xl border border-dashed px-6 py-16 text-center'>
              <h2 className='font-semibold'>No children found</h2>
              <p className='text-muted-foreground mt-1 text-sm'>
                Try another name, grade, group, or status.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
