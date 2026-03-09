import { useLingui } from '@lingui/react/macro';
import { SearchIcon } from 'lucide-react';
import React from 'react';

import { useSearch } from '@/shared/context';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface AppHeaderProps extends React.ComponentProps<'header'> {
  children?: React.ReactNode;
  isShowActions?: boolean;
}

export const PageHeader = ({ ref, className, children, ...props }: AppHeaderProps) => {
  const { t } = useLingui();
  const { setOpen } = useSearch();

  return (
    <header
      ref={ref}
      className={cn(
        'rounded-t-x bg-background sticky top-0 z-50 flex h-18 items-center gap-2 px-6',
        className
      )}
      {...props}
    >
      <div className='flex-1'>
        <Button
          className='w-full max-w-sm justify-start'
          variant='outline'
          onClick={() => setOpen(true)}
        >
          <SearchIcon />
          <span className='text-muted-foreground'>{t`Search files`}</span>
        </Button>
      </div>
      <div className='flex items-center gap-2'>{children}</div>
    </header>
  );
};
PageHeader.displayName = 'AppHeader';
