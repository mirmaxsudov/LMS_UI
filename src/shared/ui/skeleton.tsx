import { cn } from '@/shared/lib/utils.ts';

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('bg-accent animate-pulse rounded-md', className)}
      data-slot='skeleton'
      {...props}
    />
  );
};

export { Skeleton };
