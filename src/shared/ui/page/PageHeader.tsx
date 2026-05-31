import { BellIcon, SearchIcon } from 'lucide-react';
import React from 'react';

import { useAuth } from '@/modules/auth';
import { cn } from '@/shared/lib/utils.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar.tsx';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ThemeSwitch } from '@/shared/ui/theme-switch';

interface AppHeaderProps extends React.ComponentProps<'header'> {
  children?: React.ReactNode;
  isShowActions?: boolean;
}

export const PageHeader = ({ ref, className, children, ...props }: AppHeaderProps) => {
  const { user } = useAuth();

  const fullName = `${user?.firstName} ${user?.lastName}`.trim();

  return (
    <header
      ref={ref}
      className={cn(
        'rounded-t-x bg-background sticky top-0 z-50 flex items-center gap-2 p-2 px-4',
        className
      )}
      {...props}
    >
      <div className='relative w-full max-w-lg flex-1 min-[1020px]:w-auto'>
        <SearchIcon className='text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2' />
        <Input
          className='bg-muted h-10 rounded-2xl border-0 pl-12 shadow-none focus-visible:ring-2'
          placeholder='Search courses, lessons...'
        />
      </div>
      <div className='ml-auto flex items-center gap-2'>
        <ThemeSwitch />
        <Button
          className='bg-muted hover:bg-muted/80 relative rounded-full'
          size='icon'
          variant='ghost'
        >
          <BellIcon className='size-5' />
          <span className='bg-destructive text-primary-foreground absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full text-xs font-semibold'>
            3
          </span>
        </Button>
        <div className='bg-muted flex items-center gap-3 rounded-full px-2 py-1'>
          <Avatar>
            <AvatarImage src={user?.profileImageUrl as string} role='img' />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className='pr-2 text-base font-medium'>{fullName}</p>
        </div>
      </div>
    </header>
  );
};
PageHeader.displayName = 'AppHeader';
