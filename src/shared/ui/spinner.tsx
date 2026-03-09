import { LoaderIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils.ts';

const Spinner = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  return (
    <LoaderIcon
      aria-label='Loading'
      className={cn('size-4 animate-spin', className)}
      role='status'
      {...props}
    />
  );
};

export { Spinner };
