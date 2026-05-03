import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { BookOpenCheckIcon, GalleryVerticalEndIcon, GraduationCapIcon } from 'lucide-react';

import { ThemeSwitch } from '@/shared/ui/theme-switch';

import LoginHereImage from '../../../public/images/login/lms-login-hero.png';

const AuthenticatedLayout = () => {
  return (
    <div className='bg-background grid min-h-svh lg:grid-cols-[minmax(0,1.05fr)_minmax(440px,0.95fr)]'>
      <div className='relative hidden overflow-hidden bg-slate-950 lg:block'>
        <img
          alt='Learning management dashboard displayed in a modern classroom'
          className='absolute inset-0 h-full w-full object-cover'
          src={LoginHereImage}
        />
        <div className='absolute inset-0 bg-linear-to-br from-slate-950/65 via-slate-950/25 to-teal-950/45' />
        <div className='absolute inset-x-10 bottom-10 rounded-lg border border-white/15 bg-white/12 p-6 text-white shadow-2xl backdrop-blur-md'>
          <div className='mb-5 flex items-center gap-3'>
            <div className='flex size-11 items-center justify-center rounded-md bg-white/15'>
              <GraduationCapIcon className='size-6' />
            </div>
            <div>
              <p className='text-sm font-medium text-white/70'>Learning workspace</p>
              <p className='text-xl font-semibold'>Courses, analytics, and assignments in one place</p>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-3 text-sm'>
            <div className='rounded-md bg-white/12 p-3'>
              <p className='text-2xl font-semibold'>24</p>
              <p className='text-white/65'>Active courses</p>
            </div>
            <div className='rounded-md bg-white/12 p-3'>
              <p className='text-2xl font-semibold'>91%</p>
              <p className='text-white/65'>Completion</p>
            </div>
            <div className='rounded-md bg-white/12 p-3'>
              <p className='text-2xl font-semibold'>8k</p>
              <p className='text-white/65'>Learners</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_32rem)] flex min-h-svh flex-col gap-8 p-5 sm:p-8 md:p-10'>
        <div className='flex items-center justify-between gap-3'>
          <Link className='flex items-center gap-3 font-semibold tracking-tight' to='/'>
            <div className='bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-md shadow-sm'>
              <GalleryVerticalEndIcon className='size-4' />
            </div>
            <span>LMS</span>
          </Link>
          <ThemeSwitch />
        </div>
        <div className='mx-auto flex w-full max-w-[27rem] flex-1 items-center py-6'>
          <Outlet />
        </div>
        <div className='text-muted-foreground flex items-center justify-center gap-2 text-sm'>
          <BookOpenCheckIcon className='size-4' />
          <span>Secure access for instructors, students, and administrators</span>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_auth')({
  component: AuthenticatedLayout
});
