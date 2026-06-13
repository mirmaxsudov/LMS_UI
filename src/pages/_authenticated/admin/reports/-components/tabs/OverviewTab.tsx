import {
  BanknoteIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  UserPlusIcon,
  UsersIcon,
  UsersRoundIcon
} from 'lucide-react';

import { EnrollmentTrendChart } from '../charts/EnrollmentTrendChart';
import { RevenueTrendChart } from '../charts/RevenueTrendChart';
import { summaryStat } from '../mock-data';
import { StatCard } from '../StatCard';
import { TopGroupsTable } from '../tables/TopGroupsTable';

const formatCurrency = (value: number) =>
  `${new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)} UZS`;

export const OverviewTab = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
        <StatCard
          title='Total students'
          trend={summaryStat.studentsTrend}
          trendLabel='vs last month'
          value={summaryStat.totalStudents.toLocaleString()}
          description='Across all groups'
          icon={UsersIcon}
        />
        <StatCard
          title='Total teachers'
          trend={summaryStat.teachersTrend}
          trendLabel='vs last month'
          value={`${summaryStat.totalTeachers}`}
          description='Active this term'
          icon={GraduationCapIcon}
        />
        <StatCard
          title='Active groups'
          trend={summaryStat.groupsTrend}
          trendLabel='vs last month'
          value={`${summaryStat.activeGroups}`}
          description='Currently running'
          icon={UsersRoundIcon}
        />
        <StatCard
          title='New enrollments'
          trend={summaryStat.enrollmentsTrend}
          trendLabel='vs last month'
          value={`${summaryStat.newEnrollments}`}
          description='New students this period'
          icon={UserPlusIcon}
        />
        <StatCard
          title='Revenue'
          trend={summaryStat.revenueTrend}
          trendLabel='vs last month'
          value={formatCurrency(summaryStat.monthlyRevenue)}
          description='Collected this month'
          icon={BanknoteIcon}
        />
        <StatCard
          title='Avg. performance'
          trend={summaryStat.performanceTrend}
          trendLabel='vs last month'
          value={`${summaryStat.avgPerformance}%`}
          description='Across all groups'
          icon={TrendingUpIcon}
        />
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <EnrollmentTrendChart />
        </div>
        <RevenueTrendChart />
      </div>

      <TopGroupsTable />
    </div>
  );
};
