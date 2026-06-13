import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, BellIcon, CreditCardIcon, UsersIcon } from 'lucide-react';

import { useAuth } from '@/modules/auth';
import { Button } from '@/shared/ui/button';
import { Progress } from '@/shared/ui/progress';

import { overviewStat } from './mock-data';

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const ParentWelcomeBanner = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className='from-primary to-chart-4 text-primary-foreground flex flex-col gap-6 rounded-xl bg-gradient-to-br p-6 lg:flex-row lg:items-center lg:justify-between'>
      <div className='space-y-3'>
        <div>
          <h1 className='text-2xl font-semibold'>
            {getGreeting()}, {user?.firstName}!
          </h1>
          <p className='text-primary-foreground/75 text-sm'>
            {today} · Here&#39;s how your children are doing
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <UsersIcon className='size-4' />
            <span className='text-sm font-medium'>{overviewStat.totalChildren} children</span>
          </div>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <BellIcon className='size-4' />
            <span className='text-sm font-medium'>{overviewStat.unreadMessages} new messages</span>
          </div>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <CreditCardIcon className='size-4' />
            <span className='text-sm font-medium'>
              {overviewStat.pendingPaymentsCount} payments due
            </span>
          </div>
        </div>
      </div>

      <div className='w-full space-y-3 rounded-lg bg-white/12 p-4 lg:w-80'>
        <p className='text-primary-foreground/75 text-xs'>This month at a glance</p>
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span>Average attendance</span>
            <span className='font-semibold'>{overviewStat.averageAttendance}%</span>
          </div>
          <Progress
            className='bg-white/20 [&>div]:bg-white'
            value={overviewStat.averageAttendance}
          />
        </div>
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span>Average performance</span>
            <span className='font-semibold'>{overviewStat.averagePerformance}%</span>
          </div>
          <Progress
            className='bg-white/20 [&>div]:bg-white'
            value={overviewStat.averagePerformance}
          />
        </div>
        <Button asChild className='text-primary w-full bg-white hover:bg-white/90' size='sm'>
          <Link to='/parent/children'>
            View all children
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
};
