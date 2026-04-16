import type { ReactNode } from 'react';

import React from 'react';

import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { cn } from '@/shared/lib/utils.ts';
import { FilterToolbar } from '@/shared/ui/filter';

type FilterConfig = FilterMap[keyof FilterMap];

interface MainProps extends React.ComponentProps<'main'> {
  actions?: ReactNode;
  filtersConfig?: FilterConfig[];
}

export const PageContent = ({
  ref,
  className,
  filtersConfig,
  children,
  actions,
  ...props
}: MainProps) => {
  return (
    <main
      ref={ref}
      className={cn('bg-background flex-1 overflow-y-auto px-6 py-4', className)}
      {...props}
    >
      {actions}
      {filtersConfig?.length ? (
        <FilterToolbar className='mb-4 flex-wrap' filters={filtersConfig} />
      ) : null}
      {children}
    </main>
  );
};
