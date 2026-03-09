import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { GalleryVerticalEndIcon } from 'lucide-react';

import { ThemeSwitch } from '@/shared/ui/theme-switch';

import LoginHereImage from '../../../public/images/login/login-image.jpg';

const AuthenticatedLayout = () => {
  return (
    <div className='bg-primary/5 grid min-h-svh lg:grid-cols-2'>
      <div className='bg-muted relative hidden lg:block'>
        <img
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[.3] dark:grayscale'
          src={LoginHereImage}
        />
      </div>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-between gap-2'>
          <Link className='flex items-center gap-2 font-medium' to='/'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEndIcon className='size-4' />
            </div>
            LMS
          </Link>
          <ThemeSwitch />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_auth')({
  component: AuthenticatedLayout
});
