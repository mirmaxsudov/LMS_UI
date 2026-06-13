import { createFileRoute } from '@tanstack/react-router';
import {
  Award,
  CalendarCheckIcon,
  ClipboardListIcon,
  ClockIcon,
  StarIcon,
  TrendingUpIcon
} from 'lucide-react';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';

import { CurriculumProgressList } from './-components/CurriculumProgressList';
import { FeedbackSummaryCard } from './-components/FeedbackSummaryCard';
import { GradingTurnaroundChart } from './-components/GradingTurnaroundChart';
import { progressOverview } from './-components/mock-data';
import { ProgressHero } from './-components/ProgressHero';
import { SkillsRadarChart } from './-components/SkillsRadarChart';
import { StatCard } from './-components/StatCard';
import { StudentOutcomesTrendChart } from './-components/StudentOutcomesTrendChart';
import { TeachingActivityChart } from './-components/TeachingActivityChart';
import { TeachingGoalsCard } from './-components/TeachingGoalsCard';
import { TeachingHoursChart } from './-components/TeachingHoursChart';

const TeacherProgressRoutePage = () => {
  return (
    <>
      <PageHeader />
      <div className='flex flex-col gap-6 p-6'>
        <ProgressHero />

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
          <StatCard
            title='Curriculum completion'
            trend={progressOverview.curriculumCompletionTrend}
            trendLabel='% this term'
            value={`${progressOverview.curriculumCompletion}%`}
            description='Average across all groups'
            icon={ClipboardListIcon}
          />
          <StatCard
            title='Lessons delivered'
            value={`${progressOverview.lessonsDelivered}`}
            description={`of ${progressOverview.lessonsPlanned} planned`}
            icon={CalendarCheckIcon}
          />
          <StatCard
            title='Avg. student score'
            trend={progressOverview.avgStudentScoreTrend}
            trendLabel='% vs last month'
            value={`${progressOverview.avgStudentScore}%`}
            description='Across all groups'
            icon={TrendingUpIcon}
          />
          <StatCard
            title='Attendance rate'
            trend={progressOverview.attendanceTrend}
            trendLabel='% vs last month'
            value={`${progressOverview.attendanceRate}%`}
            description='Across all groups'
            icon={Award}
          />
          <StatCard
            invertTrend
            title='Grading turnaround'
            trend={progressOverview.gradingTurnaroundTrend}
            trendLabel='% vs last month'
            value={`${progressOverview.gradingTurnaroundDays}d`}
            description='Average time to grade'
            icon={ClockIcon}
          />
          <StatCard
            title='Student feedback'
            trend={progressOverview.feedbackRatingTrend}
            trendLabel='% vs last month'
            value={`${progressOverview.feedbackRating.toFixed(1)} / 5`}
            description='Average rating this term'
            icon={StarIcon}
          />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <TeachingActivityChart />
          </div>
          <TeachingHoursChart />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <StudentOutcomesTrendChart />
          </div>
          <FeedbackSummaryCard />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <CurriculumProgressList />
          </div>
          <GradingTurnaroundChart />
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <SkillsRadarChart />
          </div>
          <TeachingGoalsCard />
        </div>
      </div>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/teacher/progress/')({
  component: TeacherProgressRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
