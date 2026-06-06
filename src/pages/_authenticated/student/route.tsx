import { createFileRoute, Outlet } from '@tanstack/react-router';
import Cookies from 'js-cookie';

import { SearchProvider } from '@/shared/context';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { Spinner } from '@/shared/ui/spinner';

import { AppSidebar } from './-components/AppSidebar';

const StudentLayout = () => {
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={Cookies.get('sidebar_state') !== 'false'}>
        <AppSidebar />
        <SidebarInset className='bg-background'>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </SearchProvider>
  );
};

export const Route = createFileRoute('/_authenticated/student')({
  pendingComponent: () => (
    <div className='grid h-screen place-items-center'>
      <Spinner />
    </div>
  ),
  component: StudentLayout
});
