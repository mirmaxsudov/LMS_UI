import type { ReactNode } from 'react';

import { Badge } from '@/shared/ui/badge';

interface OnlineCourseBadgeProps {
  children: ReactNode;
  color: string;
}

export const OnlineCourseBadge = ({ children, color }: OnlineCourseBadgeProps) => (
  <Badge
    style={{
      backgroundColor: `${color}22`,
      color
    }}
    className='border-transparent'
  >
    {children}
  </Badge>
);
