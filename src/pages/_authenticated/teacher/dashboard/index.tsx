import { createFileRoute } from '@tanstack/react-router';
import { Award, CalendarCheckIcon, ClipboardListIcon, Layers, UsersIcon } from 'lucide-react';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { AttendanceOverviewChart } from './-components/AttendanceOverviewChart';
import { ClassPerformanceTrendChart } from './-components/ClassPerformanceTrendChart';
import { GroupPerformanceChart } from './-components/GroupPerformanceChart';
import { GroupsOverviewList } from './-components/GroupsOverviewList';
import { overviewStat } from './-components/mock-data';
import { NotificationsCard } from './-components/NotificationsCard';
import { PendingGradingCard } from './-components/PendingGradingCard';
import { StatCard } from './-components/StatCard';
import { TodayScheduleCard } from './-components/TodayScheduleCard';
import { TopStudentsCard } from './-components/TopStudentsCard';
import { WeeklyLessonsChart } from './-components/WeeklyLessonsChart';
import { WelcomeBanner } from './-components/WelcomeBanner';

const TeacherDashboardRoutePage = () => {
  return (
    <>
      <PageHeader />
      <div className='flex flex-col gap-6 p-6'>
        <WelcomeBanner />

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
          <StatCard
            title='Total students'
            trend={overviewStat.totalStudentsTrend}
            trendLabel='this term'
            value={`${overviewStat.totalStudents}`}
            description='Across all groups'
            icon={UsersIcon}
          />
          <StatCard
            title='Active groups'
            trend={overviewStat.activeGroupsTrend}
            trendLabel='new this term'
            value={`${overviewStat.activeGroups}`}
            description='This term'
            icon={Layers}
          />
          <StatCard
            title='Lessons this week'
            value={`${overviewStat.lessonsThisWeek}`}
            description={`${overviewStat.lessonsToday} today`}
            icon={CalendarCheckIcon}
          />
          <StatCard
            title='Pending grading'
            value={`${overviewStat.pendingGrading}`}
            description={`${overviewStat.gradingDueToday} due today`}
            icon={ClipboardListIcon}
          />
          <StatCard
            title='Attendance rate'
            trend={overviewStat.attendanceTrend}
            trendLabel='vs last month'
            value={`${overviewStat.attendanceRate}%`}
            description='Across all groups'
            icon={CalendarCheckIcon}
          />
          <StatCard
            title='Avg. group score'
            trend={overviewStat.avgGroupScoreTrend}
            trendLabel='vs last month'
            value={`${overviewStat.avgGroupScore}%`}
            description='Across all groups'
            icon={Award}
          />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <WeeklyLessonsChart />
          </div>
          <AttendanceOverviewChart />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <ClassPerformanceTrendChart />
          </div>
          <TodayScheduleCard />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <GroupsOverviewList />
          </div>
          <TopStudentsCard />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <GroupPerformanceChart />
          </div>
          <NotificationsCard />
        </div>

        <PendingGradingCard />
      </div>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/teacher/dashboard/')({
  component: TeacherDashboardRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
