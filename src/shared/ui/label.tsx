import { Label as LabelPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/shared/lib/utils.ts';

const Label = ({
  className,
  isRequired,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { isRequired?: boolean }) => {
  return (
    <LabelPrimitive.Root
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      data-slot='label'
      {...props}
    >
      {children}
      {isRequired && <span className='text-destructive'>*</span>}
    </LabelPrimitive.Root>
  );
};

export { Label };
