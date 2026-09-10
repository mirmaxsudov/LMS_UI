import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { BookOpenCheckIcon, DropletsIcon } from 'lucide-react';

import Logo from '@/../public/images/logo.png';

import LoginHereImage from '../../../public/images/login/lms-login-hero.png';

const AuthenticatedLayout = () => {
  return (
    <div className='bg-background grid min-h-svh lg:grid-cols-[minmax(0,1.05fr)_minmax(440px,0.95fr)]'>
      <div className='relative hidden overflow-hidden bg-slate-950 lg:block'>
        <img
          alt='Suvchilar maktabi o‘quv muhiti'
          className='absolute inset-0 h-full w-full object-cover object-right'
          src={LoginHereImage}
        />
        <div className='absolute inset-0 bg-linear-to-br from-slate-950/65 via-slate-950/25 to-teal-950/45' />
        <div className='absolute inset-x-10 bottom-10 rounded-lg border border-white/15 bg-white/12 p-6 text-white shadow-2xl backdrop-blur-md'>
          <div className='mb-5 flex items-center gap-3'>
            <div className='flex size-11 items-center justify-center rounded-md bg-white/15'>
              <DropletsIcon className='size-6' />
            </div>
            <div>
              <p className='text-sm font-medium text-white/70'>Suvchilar maktabi</p>
              <p className='font-[Georgia,serif] text-xl font-semibold'>
                Suv xo‘jaligi bilimlari — amaliy natijalar uchun
              </p>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-3 text-sm'>
            <div className='rounded-md bg-white/12 p-3'>
              <p className='text-2xl font-semibold'>24</p>
              <p className='text-white/65'>Faol kurslar</p>
            </div>
            <div className='rounded-md bg-white/12 p-3'>
              <p className='text-2xl font-semibold'>87%</p>
              <p className='text-white/65'>Yakunlash</p>
            </div>
            <div className='rounded-md bg-white/12 p-3'>
              <p className='text-2xl font-semibold'>1 284</p>
              <p className='text-white/65'>Tinglovchilar</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex min-h-svh flex-col gap-8 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_32rem)] p-5 sm:p-8 md:p-10'>
        <div className='flex items-center justify-between gap-3'>
          <Link className='flex items-center gap-3 font-semibold tracking-tight' to='/'>
            <div className='flex size-9 items-center justify-center rounded-md shadow-sm'>
              <img alt='AGRO LMS Logo' className='size-full' src={Logo} />
            </div>
            <span className='font-[Georgia,serif]'>Suvchilar maktabi</span>
          </Link>
          <span className='bg-primary/10 text-primary rounded-full px-3 py-1.5 text-xs font-bold tracking-wide uppercase'>
            Agro LMS
          </span>
        </div>
        <div className='mx-auto flex w-full max-w-108 flex-1 items-center py-6'>
          <Outlet />
        </div>
        <div className='text-muted-foreground flex items-center justify-center gap-2 text-sm'>
          <BookOpenCheckIcon className='size-4' />
          <span>Tinglovchi, ekspert va administrator uchun himoyalangan kirish</span>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_auth')({
  component: AuthenticatedLayout
});
