import { createFileRoute } from '@tanstack/react-router';
import {
  BookOpenIcon,
  CheckIcon,
  ClockIcon,
  PlayIcon,
  TrendingUpIcon,
  TrophyIcon
} from 'lucide-react';

import { useAuth } from '@/modules/auth';
import { Button } from '@/shared/ui/button';
import { PageContent } from '@/shared/ui/page';

const stats = [
  {
    title: 'Courses Enrolled',
    value: '4',
    subtitle: '2 in progress',
    icon: BookOpenIcon
  },
  {
    title: 'Hours Learned',
    value: '38',
    subtitle: '+5h this week',
    icon: ClockIcon
  },
  {
    title: 'Completed',
    value: '12',
    subtitle: 'Lessons this month',
    icon: TrophyIcon
  },
  {
    title: 'Streak',
    value: '7',
    subtitle: 'Days in a row',
    icon: TrendingUpIcon
  }
] as const;

const courses = [
  {
    title: 'Python: Functions & Modules',
    progress: 63,
    lessons: 'Lesson 15 of 24',
    time: '45 min'
  },
  { title: 'Product Design Basics', progress: 28, lessons: 'Lesson 4 of 14', time: '32 min' },
  { title: 'JavaScript Essentials', progress: 81, lessons: 'Lesson 13 of 16', time: '39 min' }
] as const;

const tasks = [
  { title: 'Submit assignment draft', course: 'Python Basics', due: 'Due today' },
  { title: 'Quiz: UI Principles', course: 'Design Thinking', due: 'Due tomorrow' },
  { title: 'Team discussion reply', course: 'Communication', due: 'Due in 2 days' }
] as const;

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user.firstName ?? 'Learner';

  return (
    <PageContent className='bg-background px-4 py-5 md:px-8 md:py-6'>
      <div className='mx-auto max-w-7xl space-y-8'>
        <section className='space-y-2'>
          <h1 className='text-4xl font-semibold tracking-tight'>Welcome back, {firstName}!</h1>
          <p className='text-muted-foreground text-2xl font-medium'>
            Continue your learning journey
          </p>
        </section>
        <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {stats.map((item) => (
            <article
              key={item.title}
              className='bg-card border-border/80 flex items-start justify-between rounded-3xl border p-6 shadow-sm'
            >
              <div className='space-y-1'>
                <p className='text-muted-foreground text-lg font-medium'>{item.title}</p>
                <p className='text-5xl leading-none font-semibold'>{item.value}</p>
                <p className='text-muted-foreground text-xl'>{item.subtitle}</p>
              </div>
              <div className='bg-primary/12 text-primary inline-flex size-14 items-center justify-center rounded-2xl'>
                <item.icon className='size-7' />
              </div>
            </article>
          ))}
        </section>

        <section className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-4xl font-semibold tracking-tight'>Continue Learning</h2>
            <Button className='text-primary text-xl' variant='link'>
              View All
            </Button>
          </div>
          <article className='from-primary to-chart-1 rounded-3xl bg-linear-to-r p-8 text-white shadow-lg'>
            <p className='text-lg font-semibold text-white/80'>Up next</p>
            <h3 className='mt-3 text-4xl font-semibold'>Python: Functions & Modules</h3>
            <p className='mt-3 text-2xl text-white/85'>Lesson 15 of 24 � 45 min</p>
            <div className='mt-8 flex flex-wrap items-center justify-between gap-5'>
              <div className='h-3 min-w-56 flex-1 overflow-hidden rounded-full bg-white/25'>
                <div className='h-full w-2/3 rounded-full bg-white/80' />
              </div>
              <Button className='h-14 min-w-44 rounded-2xl bg-white text-lg text-[#2d3055] hover:bg-white/90'>
                <PlayIcon className='size-5' />
                Resume
              </Button>
            </div>
          </article>
        </section>

        <section className='grid gap-6 xl:grid-cols-2'>
          <article className='bg-card border-border/80 rounded-3xl border p-6 shadow-sm'>
            <h3 className='text-4xl font-semibold tracking-tight'>My Courses</h3>
            <div className='mt-5 space-y-4'>
              {courses.map((course) => (
                <div key={course.title} className='border-border/80 rounded-2xl border p-4'>
                  <p className='text-xl font-semibold'>{course.title}</p>
                  <p className='text-muted-foreground mt-1 text-base'>
                    {course.lessons} � {course.time}
                  </p>
                  <div className='bg-muted mt-3 h-2 overflow-hidden rounded-full'>
                    <div
                      className='bg-primary h-full rounded-full'
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className='bg-card border-border/80 rounded-3xl border p-6 shadow-sm'>
            <h3 className='text-4xl font-semibold tracking-tight'>Upcoming Tasks</h3>
            <div className='mt-5 space-y-4'>
              {tasks.map((task) => (
                <div
                  key={task.title}
                  className='border-border/80 flex items-start justify-between gap-3 rounded-2xl border p-4'
                >
                  <div>
                    <p className='text-xl font-semibold'>{task.title}</p>
                    <p className='text-muted-foreground mt-1 text-base'>{task.course}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-primary flex items-center justify-end gap-1 text-sm font-medium'>
                      <CheckIcon className='size-4' />
                      {task.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </PageContent>
  );
};

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: Dashboard
});
