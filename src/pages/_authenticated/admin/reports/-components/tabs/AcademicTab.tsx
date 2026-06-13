import { AwardIcon, BookOpenCheckIcon, ClipboardCheckIcon, TrendingUpIcon } from 'lucide-react';

import { GradeDistributionChart } from '../charts/GradeDistributionChart';
import { PerformanceByGroupChart } from '../charts/PerformanceByGroupChart';
import { summaryStat } from '../mock-data';
import { StatCard } from '../StatCard';
import { TopGroupsTable } from '../tables/TopGroupsTable';

export const AcademicTab = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Average score'
          trend={summaryStat.performanceTrend}
          trendLabel='vs last month'
          value={`${summaryStat.avgPerformance}%`}
          description='Across all groups'
          icon={TrendingUpIcon}
        />
        <StatCard
          title='Pass rate'
          trend={2}
          trendLabel='vs last month'
          value='87%'
          description='Students scoring 60% or higher'
          icon={AwardIcon}
        />
        <StatCard
          title='Assignments completed'
          trend={4}
          trendLabel='vs last month'
          value='91%'
          description='Submitted on time'
          icon={ClipboardCheckIcon}
        />
        <StatCard
          title='Quiz average'
          trend={-1}
          trendLabel='vs last month'
          value='76%'
          description='Average across all groups'
          icon={BookOpenCheckIcon}
        />
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <PerformanceByGroupChart />
        </div>
        <GradeDistributionChart />
      </div>

      <TopGroupsTable />
    </div>
  );
};
