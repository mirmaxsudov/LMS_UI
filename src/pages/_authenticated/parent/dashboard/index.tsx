import { createFileRoute } from '@tanstack/react-router';
import { CreditCardIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { AnnouncementsCard } from './-components/AnnouncementsCard';
import { AttendanceComparisonChart } from './-components/AttendanceComparisonChart';
import { ChildrenOverview } from './-components/ChildrenOverview';
import { overviewStat } from './-components/mock-data';
import { ParentWelcomeBanner } from './-components/ParentWelcomeBanner';
import { PaymentsOverviewCard } from './-components/PaymentsOverviewCard';
import { PerformanceTrendChart } from './-components/PerformanceTrendChart';
import { StatCard } from './-components/StatCard';
import { SubjectPerformanceChart } from './-components/SubjectPerformanceChart';
import { UpcomingAssignmentsCard } from './-components/UpcomingAssignmentsCard';
import { UpcomingScheduleCard } from './-components/UpcomingScheduleCard';

const formatAmount = (amount: number) => `${amount.toLocaleString('en-US')} UZS`;

const ParentDashboardRoutePage = () => {
  return (
    <>
      <PageHeader />
      <div className='flex flex-col gap-6 p-6'>
        <ParentWelcomeBanner />

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatCard
            title='Children'
            value={`${overviewStat.totalChildren}`}
            description='Enrolled in the learning center'
            icon={UsersIcon}
          />
          <StatCard
            title='Average attendance'
            trend={overviewStat.averageAttendanceTrend}
            trendLabel='vs last month'
            value={`${overviewStat.averageAttendance}%`}
            description='Across all children'
            icon={TrendingUpIcon}
          />
          <StatCard
            title='Average performance'
            trend={overviewStat.averagePerformanceTrend}
            trendLabel='vs last month'
            value={`${overviewStat.averagePerformance}%`}
            description='Across all subjects'
            icon={TrendingUpIcon}
          />
          <StatCard
            title='Payments due'
            value={formatAmount(overviewStat.pendingPaymentsAmount)}
            description={`${overviewStat.pendingPaymentsCount} invoices outstanding`}
            icon={CreditCardIcon}
          />
        </div>

        <ChildrenOverview />

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <PerformanceTrendChart />
          </div>
          <AttendanceComparisonChart />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <SubjectPerformanceChart />
          </div>
          <PaymentsOverviewCard />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <UpcomingScheduleCard />
          </div>
          <AnnouncementsCard />
        </div>

        <UpcomingAssignmentsCard />
      </div>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/parent/dashboard/')({
  component: ParentDashboardRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
