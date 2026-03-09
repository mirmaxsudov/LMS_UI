import { BellIcon, SearchIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils.ts';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input.tsx';

interface AppHeaderProps extends React.ComponentProps<'header'> {
  children?: React.ReactNode;
  isShowActions?: boolean;
}

export const PageHeader = ({ ref, className, children, ...props }: AppHeaderProps) => {
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
          <div className='bg-primary text-primary-foreground grid size-10 place-items-center rounded-full text-sm font-semibold'>
            FN
          </div>
          <p className='pr-2 text-base font-medium'>Full name</p>
        </div>
      </div>
    </header>
  );
};
PageHeader.displayName = 'AppHeader';
