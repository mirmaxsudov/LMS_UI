import { ClockIcon, GraduationCapIcon, StarIcon, UsersRoundIcon } from 'lucide-react';

import { TeacherWorkloadChart } from '../charts/TeacherWorkloadChart';
import { summaryStat } from '../mock-data';
import { StatCard } from '../StatCard';
import { TopTeachersTable } from '../tables/TopTeachersTable';

export const StaffTab = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total teachers'
          trend={summaryStat.teachersTrend}
          trendLabel='vs last month'
          value={`${summaryStat.totalTeachers}`}
          description='Active this term'
          icon={GraduationCapIcon}
        />
        <StatCard
          title='Avg. group size'
          trend={1}
          trendLabel='vs last term'
          value='17.5'
          description='Students per teacher'
          icon={UsersRoundIcon}
        />
        <StatCard
          title='Avg. teacher rating'
          trend={1}
          trendLabel='vs last term'
          value='4.7'
          description='Out of 5.0'
          icon={StarIcon}
        />
        <StatCard
          title='Total lesson hours'
          trend={6}
          trendLabel='vs last month'
          value='1,248'
          description='Delivered this month'
          icon={ClockIcon}
        />
      </div>

      <TeacherWorkloadChart />

      <TopTeachersTable />
    </div>
  );
};
