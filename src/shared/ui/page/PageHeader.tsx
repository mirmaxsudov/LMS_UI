import { useLingui } from '@lingui/react';
import { useLocation } from '@tanstack/react-router';
import { BellIcon } from 'lucide-react';
import React from 'react';

import type { Locale } from '@/shared/i18n/config';

import { dynamicActivate } from '@/shared/i18n/dynamicActivate';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { ThemeSwitch } from '@/shared/ui/theme-switch.tsx';

import { GlobalSearch } from './GlobalSearch';

interface AppHeaderProps extends React.ComponentProps<'header'> {
  children?: React.ReactNode;
  isShowActions?: boolean;
}

export const PageHeader = ({ ref, className, children, ...props }: AppHeaderProps) => {
  const { i18n } = useLingui();
  const pathname = useLocation().pathname;

  const currentUser = pathname.startsWith('/admin')
    ? { name: 'Kamola Sattorova', initials: 'KS' }
    : pathname.startsWith('/teacher')
      ? { name: 'Dilorom Karimova', initials: 'DK' }
      : pathname.startsWith('/parent')
        ? { name: 'Nodira Rahimova', initials: 'NR' }
        : { name: 'Aziza Abdullayeva', initials: 'AA' };

  return (
    <header
      ref={ref}
      className={cn(
        'rounded-t-x bg-background sticky top-0 z-50 flex items-center gap-2 p-4',
        className
      )}
      {...props}
    >
      <SidebarTrigger className='shrink-0 rounded-full' />
      <GlobalSearch />
      <div className='ml-auto flex items-center gap-2'>
        <ThemeSwitch />
        <div
          aria-label='Tilni tanlash'
          className='hidden items-center rounded-full border bg-white p-1 sm:flex'
          role='group'
        >
          {(['uz', 'ru'] as const).map((locale) => (
            <button
              key={locale}
              className={cn(
                'rounded-full px-2.5 py-1 text-xs font-bold transition-colors',
                i18n.locale === locale
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-pressed={i18n.locale === locale}
              type='button'
              onClick={() => void dynamicActivate(locale as Locale)}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
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
            <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
          <p className='hidden pr-2 text-sm font-medium sm:block sm:text-base'>
            {currentUser.name}
          </p>
        </div>
      </div>
    </header>
  );
};
PageHeader.displayName = 'AppHeader';
