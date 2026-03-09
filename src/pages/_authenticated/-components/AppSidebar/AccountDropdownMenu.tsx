import { useLingui } from '@lingui/react/macro';
import {
  CheckIcon,
  ChevronDown,
  LanguagesIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  SunMoonIcon
} from 'lucide-react';
import { useEffect } from 'react';

import type { Locale } from '@/shared/i18n';

import { useAuth } from '@/modules/auth';
import { useTheme } from '@/shared/context';
import { dynamicActivate, getLocale } from '@/shared/i18n';
import { localeOptions } from '@/shared/i18n/constants.ts';
import { cn } from '@/shared/lib/utils.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu.tsx';
import { SidebarMenuButton } from '@/shared/ui/sidebar.tsx';

export const AccountDropdownMenu = () => {
  const { t } = useLingui();
  const { theme, setTheme } = useTheme();
  const currentLocale = getLocale();
  const { onLogout } = useAuth();

  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff';
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor);
  }, [theme]);

  const onLocaleChange = async (locale: Locale) => {
    await dynamicActivate(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className='p-1.5 group-data-[collapsible=icon]:p-1.5!'>
          <img alt='logo' className='size-6 shrink-0 rounded-xs' src='/adminka-logo.png' />
          <span className='truncate font-semibold'>Admin</span>
          <ChevronDown className='opacity-50' />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-52 rounded-lg' side='top'>
        <DropdownMenuLabel className='text-sidebar-foreground/70 flex items-center gap-2'>
          <img alt='logo' className='size-5 shrink-0 rounded-xs' src='/adminka-logo.png' />
          <span className='truncate font-semibold'>Admin</span>
        </DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunMoonIcon className='text-muted-foreground mr-2 size-4' />
            {t`Theme`}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <SunIcon />
                {t`Light`}
                <CheckIcon className={cn('ml-auto size-3.5', theme !== 'light' && 'hidden')} />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <MoonIcon />
                {t`Dark`}
                <CheckIcon className={cn('ml-auto size-3.5', theme !== 'dark' && 'hidden')} />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <LanguagesIcon className='text-muted-foreground mr-2 size-4' />
            {t`Language`}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {localeOptions.map((locale) => (
                <DropdownMenuItem key={locale.value} onClick={() => onLocaleChange(locale.value)}>
                  {locale.label}
                  <CheckIcon
                    className={cn('ml-auto size-3.5', locale.value !== currentLocale && 'hidden')}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive' onClick={onLogout}>
          <LogOutIcon />
          {t`Logout`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
