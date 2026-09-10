import { cn } from '@/shared/lib/utils.ts';

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'animate-[skeleton-shimmer_1.8s_ease-in-out_infinite] rounded-md bg-[linear-gradient(100deg,var(--skeleton)_20%,var(--skeleton-highlight)_50%,var(--skeleton)_80%)] [background-size:200%_100%] motion-reduce:animate-none',
        className
      )}
      data-slot='skeleton'
      {...props}
    />
  );
};

export { Skeleton };
