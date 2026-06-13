import type { LucideIcon } from 'lucide-react';

import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Card, CardContent } from '@/shared/ui/card';

interface StatCardProps {
  description: string;
  icon: LucideIcon;
  title: string;
  trend?: number;
  trendLabel?: string;
  value: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel
}: StatCardProps) => {
  const isPositive = (trend ?? 0) >= 0;

  return (
    <Card>
      <CardContent className='flex items-start justify-between gap-4'>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-sm'>{title}</p>
          <p className='text-2xl font-semibold'>{value}</p>
          <p className='text-muted-foreground text-xs'>{description}</p>
          {trend !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                isPositive ? 'text-success' : 'text-destructive'
              )}
            >
              {isPositive ? (
                <TrendingUpIcon className='size-3.5' />
              ) : (
                <TrendingDownIcon className='size-3.5' />
              )}
              <span>
                {isPositive ? '+' : ''}
                {trend}% {trendLabel}
              </span>
            </div>
          )}
        </div>
        <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg'>
          <Icon className='size-5' />
        </div>
      </CardContent>
    </Card>
  );
};
