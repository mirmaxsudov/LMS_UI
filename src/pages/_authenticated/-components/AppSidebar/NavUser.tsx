import { useLingui } from '@lingui/react/macro';
import { CheckIcon, ChevronsUpDown, LanguagesIcon, LogOutIcon } from 'lucide-react';

import { useAuth } from '@/modules/auth';
import { formatPhoneNumber } from '@/shared/lib/format.ts';
import { cn } from '@/shared/lib/utils.ts';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar.tsx';
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
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar.tsx';

const localeOptions = [
  { value: 'ru', label: 'Русский' },
  { value: 'uz', label: 'O`zbekcha' },
  { value: 'qr', label: 'Qaraqalpaqsha' }
];

export const NavUser = () => {
  const { t } = useLingui();
  const { user, onLogout } = useAuth();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              size='lg'
            >
              <Avatar className='text-foreground size-11 rounded-lg uppercase'>
                <AvatarFallback>{user.firstName?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.firstName}</span>
                <span className='truncate text-xs'>{formatPhoneNumber(user.phoneNumber)}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-5' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm leading-none font-medium'>{user.firstName}</p>
                <p className='text-muted-foreground text-xs leading-none'>
                  {formatPhoneNumber(user.phoneNumber)}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <LanguagesIcon className='text-muted-foreground mr-2 size-4' />
                Til
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {localeOptions.map((locale) => (
                    <DropdownMenuItem key={locale.value} disabled={locale.value !== 'uz'}>
                      {locale.label}
                      <CheckIcon
                        className={cn('ml-auto size-3.5', locale.value !== 'uz' && 'hidden')}
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
