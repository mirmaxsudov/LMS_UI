import { useLingui } from '@lingui/react/macro';
import { Link, useLocation } from '@tanstack/react-router';
import { LogOutIcon, PanelLeftOpenIcon, SettingsIcon } from 'lucide-react';
import * as React from 'react';

import { AlertLogoutDialog } from '@/modules/auth';
import { NavUser } from '@/pages/_authenticated/-components/AppSidebar/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/shared/ui/sidebar';

import { AppSidebarNavGroup } from './AppSidebarNavGroup';
import { useSidebarData } from './useSidebarData';

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { t } = useLingui();
  const { open, setOpen, setOpenMobile } = useSidebar();
  const pathname = useLocation().pathname;
  const sidebarData = useSidebarData();

  return (
    <>
      <Sidebar className='group' collapsible='icon' {...props}>
        <SidebarHeader>
          <SidebarMenuItem className='flex items-center justify-between gap-4 py-2'>
            <SidebarMenuButton
              asChild
              className='hover:bg-sidebar w-fit justify-start px-2 group-data-[collapsible=icon]:p-1!'
            >
              <Link to='/'>
                <img alt='Logo' className='size-10 shrink-0' src='/logo.png' />
                <span className='text-xl font-semibold'>LMS</span>
              </Link>
            </SidebarMenuButton>
            {open && (
              <SidebarTrigger
                className='text-muted-foreground opacity-0 group-hover:opacity-100'
                size='icon'
              />
            )}
          </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent className='divide-y'>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavUser />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          {sidebarData.navGroups.map((props, index) => (
            <AppSidebarNavGroup key={index} {...props} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {!open && (
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setOpen(true)} tooltip={t`Open panel`}>
                  <PanelLeftOpenIcon />
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/settings'}
                onClick={() => setOpenMobile(false)}
                tooltip={t`Settings`}
              >
                <Link to='/settings'>
                  <SettingsIcon />
                  {`Settings`}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <AlertLogoutDialog>
                <SidebarMenuButton onClick={() => setOpenMobile(false)} tooltip={t`Logout`}>
                  <LogOutIcon />
                  {t`Logout`}
                </SidebarMenuButton>
              </AlertLogoutDialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
