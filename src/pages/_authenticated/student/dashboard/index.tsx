import { createFileRoute } from '@tanstack/react-router';
import { Award, BookOpenIcon, CalendarCheckIcon, ClipboardListIcon } from 'lucide-react';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { AnnouncementsCard } from './-components/AnnouncementsCard';
import { AttendanceOverviewChart } from './-components/AttendanceOverviewChart';
import { CourseProgressList } from './-components/CourseProgressList';
import { overviewStat } from './-components/mock-data';
import { PerformanceTrendChart } from './-components/PerformanceTrendChart';
import { StatCard } from './-components/StatCard';
import { TodayScheduleCard } from './-components/TodayScheduleCard';
import { UpcomingAssignmentsCard } from './-components/UpcomingAssignmentsCard';
import { WeeklyActivityChart } from './-components/WeeklyActivityChart';
import { WelcomeBanner } from './-components/WelcomeBanner';

const StudentDashboardRoutePage = () => {
  return (
    <>
      <PageHeader />
      <div className='flex flex-col gap-6 p-6'>
        <WelcomeBanner />

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatCard
            description='This term'
            icon={BookOpenIcon}
            title='Enrolled courses'
            trend={overviewStat.activeCoursesTrend}
            trendLabel='new this term'
            value={`${overviewStat.enrolledCourses}`}
          />
          <StatCard
            description='Across all subjects'
            icon={Award}
            title='Average score'
            trend={overviewStat.averageScoreTrend}
            trendLabel='vs last month'
            value={`${overviewStat.averageScore}%`}
          />
          <StatCard
            description='Lessons attended'
            icon={CalendarCheckIcon}
            title='Attendance rate'
            trend={overviewStat.attendanceTrend}
            trendLabel='vs last month'
            value={`${overviewStat.attendanceRate}%`}
          />
          <StatCard
            description={`${overviewStat.assignmentsDueToday} due today`}
            icon={ClipboardListIcon}
            title='Pending assignments'
            value={`${overviewStat.pendingAssignments}`}
          />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <WeeklyActivityChart />
          </div>
          <AttendanceOverviewChart />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <PerformanceTrendChart />
          </div>
          <TodayScheduleCard />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <CourseProgressList />
          </div>
          <AnnouncementsCard />
        </div>

        <UpcomingAssignmentsCard />
      </div>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/student/dashboard/')({
  component: StudentDashboardRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
