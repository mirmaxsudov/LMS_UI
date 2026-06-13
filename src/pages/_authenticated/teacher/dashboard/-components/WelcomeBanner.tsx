import { ArrowRightIcon, CalendarCheckIcon, ClipboardListIcon, UsersIcon } from 'lucide-react';

import { useAuth } from '@/modules/auth';
import { Button } from '@/shared/ui/button';

import { overviewStat, todaySchedule } from './mock-data';

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const WelcomeBanner = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const nextLesson = todaySchedule.find((item) => item.status !== 'completed');

  return (
    <div className='from-primary to-chart-4 text-primary-foreground flex flex-col gap-6 rounded-xl bg-gradient-to-br p-6 lg:flex-row lg:items-center lg:justify-between'>
      <div className='space-y-3'>
        <div>
          <h1 className='text-2xl font-semibold'>
            {getGreeting()}, {user?.firstName}!
          </h1>
          <p className='text-primary-foreground/75 text-sm'>
            {today} · Here&#39;s how your classes are doing
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <UsersIcon className='size-4' />
            <span className='text-sm font-medium'>{overviewStat.totalStudents} students</span>
          </div>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <CalendarCheckIcon className='size-4' />
            <span className='text-sm font-medium'>{overviewStat.lessonsToday} lessons today</span>
          </div>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <ClipboardListIcon className='size-4' />
            <span className='text-sm font-medium'>{overviewStat.pendingGrading} to grade</span>
          </div>
        </div>
      </div>

      {nextLesson && (
        <div className='w-full space-y-3 rounded-lg bg-white/12 p-4 lg:w-80'>
          <div>
            <p className='text-primary-foreground/75 text-xs'>
              {nextLesson.status === 'ongoing' ? 'Ongoing lesson' : 'Next lesson'}
            </p>
            <p className='font-medium'>{nextLesson.groupName}</p>
            <p className='text-primary-foreground/75 text-sm'>{nextLesson.topic}</p>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-primary-foreground/75 text-xs'>
              {nextLesson.startTime} - {nextLesson.endTime} · {nextLesson.room}
            </span>
            <Button className='text-primary bg-white hover:bg-white/90' size='sm'>
              View
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
