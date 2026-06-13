import { createFileRoute } from '@tanstack/react-router';
import { Award, BookOpenCheck, CalendarCheck, ClipboardCheck } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { AchievementsGrid } from './-components/AchievementsGrid';
import { ActivityTimelineCard } from './-components/ActivityTimelineCard';
import { AttendanceBreakdownChart } from './-components/AttendanceBreakdownChart';
import { AttendanceHistoryTable } from './-components/AttendanceHistoryTable';
import { overviewStat } from './-components/mock-data';
import { PerformanceTrendChart } from './-components/PerformanceTrendChart';
import { RecentGradesTable } from './-components/RecentGradesTable';
import { StatCard } from './-components/StatCard';
import { SubjectProgressList } from './-components/SubjectProgressList';

const StudentProgressRoutePage = () => {
  const progressPercent = Math.round(
    (overviewStat.completedLessons / overviewStat.totalLessons) * 100
  );

  return (
    <>
      <PageHeader />
      <div className='flex flex-col gap-6 p-6'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold'>My progress</h1>
            <p className='text-muted-foreground text-sm'>
              A complete overview of your academic performance, attendance and achievements
            </p>
          </div>
          <Badge className='w-fit' variant='secondary'>
            Class rank {overviewStat.classRank} of {overviewStat.classSize}
          </Badge>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatCard
            title='Average score'
            trend={overviewStat.averageScoreTrend}
            trendLabel='vs last month'
            value={`${overviewStat.averageScore}%`}
            description='Across all subjects'
            icon={Award}
          />
          <StatCard
            title='Attendance rate'
            trend={overviewStat.attendanceTrend}
            trendLabel='vs last month'
            value={`${overviewStat.attendanceRate}%`}
            description='Lessons attended'
            icon={CalendarCheck}
          />
          <StatCard
            title='Course progress'
            value={`${progressPercent}%`}
            description={`${overviewStat.completedLessons} of ${overviewStat.totalLessons} lessons`}
            icon={BookOpenCheck}
          />
          <StatCard
            title='Homework completion'
            trend={overviewStat.homeworkTrend}
            trendLabel='vs last month'
            value={`${overviewStat.homeworkCompletionRate}%`}
            description='Submitted on time'
            icon={ClipboardCheck}
          />
        </div>

        <Tabs defaultValue='overview'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='subjects'>Subjects</TabsTrigger>
            <TabsTrigger value='attendance'>Attendance</TabsTrigger>
            <TabsTrigger value='grades'>Grades</TabsTrigger>
            <TabsTrigger value='achievements'>Achievements</TabsTrigger>
          </TabsList>

          <TabsContent className='flex flex-col gap-4' value='overview'>
            <div className='grid gap-4 lg:grid-cols-3'>
              <div className='lg:col-span-2'>
                <PerformanceTrendChart />
              </div>
              <AttendanceBreakdownChart />
            </div>
            <div className='grid gap-4 lg:grid-cols-3'>
              <div className='lg:col-span-2'>
                <SubjectProgressList />
              </div>
              <ActivityTimelineCard />
            </div>
          </TabsContent>

          <TabsContent value='subjects'>
            <SubjectProgressList />
          </TabsContent>

          <TabsContent className='flex flex-col gap-4' value='attendance'>
            <div className='grid gap-4 lg:grid-cols-3'>
              <AttendanceBreakdownChart />
              <div className='lg:col-span-2'>
                <AttendanceHistoryTable />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='grades'>
            <RecentGradesTable />
          </TabsContent>

          <TabsContent value='achievements'>
            <AchievementsGrid />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/student/progress/')({
  component: StudentProgressRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
