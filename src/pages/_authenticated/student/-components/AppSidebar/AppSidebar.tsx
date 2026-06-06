import { useLingui } from '@lingui/react/macro';
import { Link, useLocation } from '@tanstack/react-router';
import { GraduationCapIcon, LogOutIcon, PanelLeftOpenIcon, SettingsIcon } from 'lucide-react';
import * as React from 'react';

import { AlertLogoutDialog } from '@/modules/auth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/shared/ui/sidebar.tsx';

import { AppSidebarNavGroup } from './AppSidebarNavGroup.tsx';
import { useStudentSidebarData } from './useStudentSidebarData.ts';

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { t } = useLingui();
  const { open, setOpen, setOpenMobile } = useSidebar();
  const pathname = useLocation().pathname;
  const sidebarData = useStudentSidebarData();

  return (
    <Sidebar className='group border-sidebar-border/90 border-r' collapsible='icon' {...props}>
      <SidebarHeader className='border-sidebar-border/90 py-4'>
        <SidebarMenuItem className='flex items-center justify-between gap-2 py-1'>
          <SidebarMenuButton
            asChild
            className='w-fit justify-start rounded-xl px-2.5 py-2 group-data-[collapsible=icon]:p-1.5!'
          >
            <Link to='/admin/settings'>
              <span className='bg-primary text-primary-foreground inline-flex size-11 items-center justify-center rounded-2xl'>
                <GraduationCapIcon className='size-5' />
              </span>
              <span className='text-xl font-semibold tracking-tight'>LMS</span>
            </Link>
          </SidebarMenuButton>
          {open && (
            <SidebarTrigger
              className='text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100'
              size='icon'
            />
          )}
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent className='py-2'>
        {sidebarData.navGroups.map((item, index) => (
          <AppSidebarNavGroup key={`${item.title}-${index}`} {...item} />
        ))}
      </SidebarContent>
      <SidebarFooter className='border-sidebar-border/90 border-t'>
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
              <Link to='/admin/settings'>
                <SettingsIcon />
                {t`Settings`}
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
  );
};
