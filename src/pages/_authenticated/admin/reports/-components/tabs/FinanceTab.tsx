import { BanknoteIcon, PercentIcon, ReceiptIcon, WalletIcon } from 'lucide-react';

import { PaymentStatusChart } from '../charts/PaymentStatusChart';
import { RevenueTrendChart } from '../charts/RevenueTrendChart';
import { summaryStat } from '../mock-data';
import { StatCard } from '../StatCard';
import { OutstandingPaymentsTable } from '../tables/OutstandingPaymentsTable';

const formatCurrency = (value: number) =>
  `${new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)} UZS`;

export const FinanceTab = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total revenue'
          trend={summaryStat.revenueTrend}
          trendLabel='vs last month'
          value={formatCurrency(summaryStat.monthlyRevenue)}
          description='Collected this month'
          icon={BanknoteIcon}
        />
        <StatCard
          title='Outstanding payments'
          trend={summaryStat.outstandingTrend}
          trendLabel='vs last month'
          value={formatCurrency(summaryStat.outstandingPayments)}
          description='Pending and overdue'
          icon={WalletIcon}
        />
        <StatCard
          title='Collection rate'
          trend={2}
          trendLabel='vs last month'
          value='94%'
          description='Invoices paid on time'
          icon={PercentIcon}
        />
        <StatCard
          title='Avg. revenue / student'
          trend={3}
          trendLabel='vs last month'
          value={formatCurrency(Math.round(summaryStat.monthlyRevenue / summaryStat.totalStudents))}
          description='Average per active student'
          icon={ReceiptIcon}
        />
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <RevenueTrendChart />
        </div>
        <PaymentStatusChart />
      </div>

      <OutstandingPaymentsTable />
    </div>
  );
};
