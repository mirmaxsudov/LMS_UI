import { ArrowRightIcon, FlameIcon, PlayCircleIcon, TrophyIcon, ZapIcon } from 'lucide-react';

import { useAuth } from '@/modules/auth';
import { Button } from '@/shared/ui/button';
import { Progress } from '@/shared/ui/progress';

import { continueLearning, overviewStat } from './mock-data';

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

  return (
    <div className='from-primary to-chart-4 text-primary-foreground flex flex-col gap-6 rounded-xl bg-gradient-to-br p-6 lg:flex-row lg:items-center lg:justify-between'>
      <div className='space-y-3'>
        <div>
          <h1 className='text-2xl font-semibold'>
            {getGreeting()}, {user?.firstName}!
          </h1>
          <p className='text-primary-foreground/75 text-sm'>
            {today} · Let&#39;s keep the momentum going
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <FlameIcon className='size-4' />
            <span className='text-sm font-medium'>{overviewStat.studyStreakDays}-day streak</span>
          </div>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <ZapIcon className='size-4' />
            <span className='text-sm font-medium'>
              {overviewStat.totalPoints.toLocaleString()} pts
            </span>
          </div>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <TrophyIcon className='size-4' />
            <span className='text-sm font-medium'>
              Rank {overviewStat.rank} of {overviewStat.rankSize}
            </span>
          </div>
        </div>
      </div>

      <div className='w-full space-y-3 rounded-lg bg-white/12 p-4 lg:w-80'>
        <div>
          <p className='text-primary-foreground/75 text-xs'>Continue learning</p>
          <p className='font-medium'>{continueLearning.courseName}</p>
          <p className='text-primary-foreground/75 text-sm'>{continueLearning.lessonTitle}</p>
        </div>
        <Progress className='bg-white/20 [&>div]:bg-white' value={continueLearning.progress} />
        <div className='flex items-center justify-between'>
          <span className='text-primary-foreground/75 text-xs'>
            {continueLearning.progress}% complete
          </span>
          <Button className='text-primary bg-white hover:bg-white/90' size='sm'>
            <PlayCircleIcon />
            Resume
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
