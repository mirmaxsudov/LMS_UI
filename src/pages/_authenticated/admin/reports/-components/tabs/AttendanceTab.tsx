import { CalendarCheckIcon, CalendarXIcon, ClockIcon, UserCheckIcon } from 'lucide-react';

import { AttendanceDistributionChart } from '../charts/AttendanceDistributionChart';
import { AttendanceTrendChart } from '../charts/AttendanceTrendChart';
import { summaryStat } from '../mock-data';
import { StatCard } from '../StatCard';

export const AttendanceTab = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Overall attendance'
          trend={summaryStat.attendanceTrend}
          trendLabel='vs last month'
          value={`${summaryStat.avgAttendanceRate}%`}
          description='Across all groups'
          icon={CalendarCheckIcon}
        />
        <StatCard
          title='Absences'
          trend={-3}
          trendLabel='vs yesterday'
          value='38'
          description='Today'
          icon={CalendarXIcon}
        />
        <StatCard
          title='Late arrivals'
          trend={1}
          trendLabel='vs yesterday'
          value='14'
          description='Today'
          icon={ClockIcon}
        />
        <StatCard
          title='Perfect attendance'
          trend={5}
          trendLabel='vs last term'
          value='128'
          description='No absences this term'
          icon={UserCheckIcon}
        />
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <AttendanceTrendChart />
        </div>
        <AttendanceDistributionChart />
      </div>
    </div>
  );
};
