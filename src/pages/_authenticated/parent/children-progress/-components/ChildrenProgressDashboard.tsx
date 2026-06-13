import {
  AwardIcon,
  BookOpenCheckIcon,
  CalendarCheckIcon,
  CalendarClockIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  TrophyIcon,
  UserRoundIcon,
  UsersRoundIcon
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';

import { children } from './mock-data';
import { ProgressCharts } from './ProgressCharts';
import { ProgressDetails } from './ProgressDetails';

const statItems = [
  {
    key: 'score',
    title: 'Overall score',
    icon: AwardIcon,
    trend: '5% vs last term',
    color: 'text-primary',
    background: 'bg-primary/10'
  },
  {
    key: 'attendance',
    title: 'Attendance',
    icon: CalendarCheckIcon,
    trend: '3% vs last term',
    color: 'text-success',
    background: 'bg-success/10'
  },
  {
    key: 'homework',
    title: 'Homework',
    icon: BookOpenCheckIcon,
    trend: '4% vs last term',
    color: 'text-chart-3',
    background: 'bg-chart-3/15'
  },
  {
    key: 'rank',
    title: 'Class rank',
    icon: TrophyIcon,
    trend: '2 places vs last term',
    color: 'text-chart-4',
    background: 'bg-chart-4/10'
  }
] as const;

export const ChildrenProgressDashboard = () => {
  const [selectedChildId, setSelectedChildId] = useState(children[0].id);
  const [range, setRange] = useState(6);
  const child = children.find((item) => item.id === selectedChildId) ?? children[0];

  return (
    <main className='flex flex-col gap-5 p-4 sm:p-6'>
      <section className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
        <div className='flex flex-col gap-1.5'>
          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Children progress</h1>
          <p className='text-muted-foreground text-sm'>
            Follow academic performance, attendance and upcoming learning goals.
          </p>
        </div>
        <div className='flex flex-col gap-2 sm:flex-row'>
          <Select value={selectedChildId} onValueChange={setSelectedChildId}>
            <SelectTrigger aria-label='Select child' className='w-full sm:w-56'>
              <UserRoundIcon />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {children.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select defaultValue='current'>
            <SelectTrigger aria-label='Select reporting period' className='w-full sm:w-44'>
              <CalendarClockIcon />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='current'>Current term</SelectItem>
                <SelectItem value='previous'>Previous term</SelectItem>
                <SelectItem value='year'>Academic year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>

      <Card className='py-4'>
        <CardContent className='grid gap-5 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1fr_1.3fr]'>
          <div className='flex items-center gap-4'>
            <Avatar className='size-14'>
              <AvatarFallback className='bg-primary/10 text-primary text-lg font-semibold'>
                {child.initials}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0'>
              <p className='truncate text-lg font-semibold'>{child.name}</p>
              <div className='mt-1 flex items-center gap-2'>
                <span className='bg-primary size-2 rounded-full' />
                <span className='text-muted-foreground text-sm'>{child.level}</span>
                <Badge variant='outline'>CEFR</Badge>
              </div>
            </div>
          </div>
          <SummaryItem label='Group' value={child.group} icon={UsersRoundIcon} />
          <SummaryItem label='Teacher' value={child.teacher} icon={GraduationCapIcon} />
          <SummaryItem
            label='Next lesson'
            value={child.nextLesson}
            description={child.nextLessonTopic}
            icon={CalendarClockIcon}
          />
        </CardContent>
      </Card>

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {statItems.map((item) => {
          const isRank = item.key === 'rank';
          const value = isRank ? child.stats.rank : child.stats[item.key];

          return (
            <Card key={item.key} className='py-5'>
              <CardContent className='flex items-center gap-4 px-5'>
                <div
                  className={`${item.background} ${item.color} grid size-12 shrink-0 place-items-center rounded-xl`}
                >
                  <item.icon className='size-6' />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-muted-foreground text-sm'>{item.title}</p>
                  <p className={`mt-1 text-3xl font-semibold tracking-tight ${item.color}`}>
                    {value}
                    {isRank ? (
                      <span className='text-foreground ml-1 text-base font-medium'>
                        of {child.stats.classSize}
                      </span>
                    ) : (
                      '%'
                    )}
                  </p>
                  <p className='text-success mt-1 flex items-center gap-1 text-xs'>
                    <TrendingUpIcon className='size-3.5' />
                    {item.trend}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <ProgressCharts range={range} onRangeChange={setRange} />
      <ProgressDetails />
    </main>
  );
};

interface SummaryItemProps {
  description?: string;
  icon: typeof UsersRoundIcon;
  label: string;
  value: string;
}

const SummaryItem = ({ icon: Icon, label, value, description }: SummaryItemProps) => (
  <div className='flex items-start gap-3 xl:border-l xl:pl-5'>
    <Icon className='text-muted-foreground mt-1 size-5 shrink-0' />
    <div className='min-w-0'>
      <p className='text-muted-foreground text-xs'>{label}</p>
      <p className='mt-1 truncate text-sm font-semibold'>{value}</p>
      {description ? <p className='text-muted-foreground mt-0.5 text-xs'>{description}</p> : null}
    </div>
  </div>
);
