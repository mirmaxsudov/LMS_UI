import { createFileRoute } from '@tanstack/react-router';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { ReportsToolbar } from './-components/ReportsToolbar';
import { AcademicTab } from './-components/tabs/AcademicTab';
import { AttendanceTab } from './-components/tabs/AttendanceTab';
import { FinanceTab } from './-components/tabs/FinanceTab';
import { OverviewTab } from './-components/tabs/OverviewTab';
import { StaffTab } from './-components/tabs/StaffTab';

const ReportsRoutePage = () => (
  <>
    <PageHeader />
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-semibold'>Reports</h1>
          <p className='text-muted-foreground text-sm'>
            Overview of academic, attendance and financial performance across the institution
          </p>
        </div>
        <ReportsToolbar />
      </div>

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='academic'>Academic</TabsTrigger>
          <TabsTrigger value='attendance'>Attendance</TabsTrigger>
          <TabsTrigger value='finance'>Finance</TabsTrigger>
          <TabsTrigger value='staff'>Staff</TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <OverviewTab />
        </TabsContent>
        <TabsContent value='academic'>
          <AcademicTab />
        </TabsContent>
        <TabsContent value='attendance'>
          <AttendanceTab />
        </TabsContent>
        <TabsContent value='finance'>
          <FinanceTab />
        </TabsContent>
        <TabsContent value='staff'>
          <StaffTab />
        </TabsContent>
      </Tabs>
    </div>
  </>
);

export const Route = createFileRoute('/_authenticated/admin/reports/')({
  component: ReportsRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
