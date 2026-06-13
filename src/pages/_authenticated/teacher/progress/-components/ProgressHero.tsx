import { Award, CalendarCheckIcon, ClipboardListIcon } from 'lucide-react';

import { useAuth } from '@/modules/auth';

import { progressOverview } from './mock-data';

export const ProgressHero = () => {
  const { user } = useAuth();

  const completionRate = Math.round(
    (progressOverview.lessonsDelivered / progressOverview.lessonsPlanned) * 100
  );

  return (
    <div className='from-primary to-chart-4 text-primary-foreground flex flex-col gap-6 rounded-xl bg-gradient-to-br p-6 lg:flex-row lg:items-center lg:justify-between'>
      <div className='space-y-3'>
        <div>
          <h1 className='text-2xl font-semibold'>Teaching progress</h1>
          <p className='text-primary-foreground/75 text-sm'>
            {user?.firstName ? `${user.firstName}'s` : 'Your'} performance across all groups this
            term
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <ClipboardListIcon className='size-4' />
            <span className='text-sm font-medium'>
              {progressOverview.curriculumCompletion}% curriculum completed
            </span>
          </div>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <CalendarCheckIcon className='size-4' />
            <span className='text-sm font-medium'>
              {progressOverview.lessonsDelivered}/{progressOverview.lessonsPlanned} lessons
              delivered
            </span>
          </div>
          <div className='flex items-center gap-2 rounded-md bg-white/12 px-3 py-2'>
            <Award className='size-4' />
            <span className='text-sm font-medium'>
              {progressOverview.feedbackRating.toFixed(1)} / 5 student feedback
            </span>
          </div>
        </div>
      </div>

      <div className='w-full space-y-3 rounded-lg bg-white/12 p-4 lg:w-80'>
        <div className='flex items-center justify-between'>
          <p className='text-primary-foreground/75 text-xs'>Lessons delivered vs planned</p>
          <span className='text-sm font-semibold'>{completionRate}%</span>
        </div>
        <div className='h-2 w-full overflow-hidden rounded-full bg-white/20'>
          <div className='h-full rounded-full bg-white' style={{ width: `${completionRate}%` }} />
        </div>
        <p className='text-primary-foreground/75 text-xs'>
          {progressOverview.lessonsPlanned - progressOverview.lessonsDelivered} lessons remaining
          this term
        </p>
      </div>
    </div>
  );
};
