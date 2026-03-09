import { cn } from '../lib/utils';

type StatusType = 'cancelled' | 'delivered' | 'pending' | 'processing' | 'shipped';

interface StatusBadgeProps {
  className?: string;
  status: StatusType;
}

const statusConfig: Record<StatusType, { label: string; className: string; dotClassName: string }> =
  {
    delivered: {
      label: 'Delivered',
      className: 'bg-success/10 text-success',
      dotClassName: 'bg-success'
    },
    pending: {
      label: 'Pending',
      className: 'bg-pending/10 text-pending-foreground',
      dotClassName: 'bg-pending'
    },
    processing: {
      label: 'Processing',
      className: 'bg-primary/10 text-primary',
      dotClassName: 'bg-primary'
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-destructive/10 text-destructive',
      dotClassName: 'bg-destructive'
    },
    shipped: {
      label: 'Shipped',
      className: 'bg-primary/10 text-primary',
      dotClassName: 'bg-primary'
    }
  };

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dotClassName)} />
      {config.label}
    </span>
  );
};
