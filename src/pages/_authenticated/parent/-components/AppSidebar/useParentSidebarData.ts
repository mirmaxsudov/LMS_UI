import { msg } from '@lingui/core/macro';
import {
  CalendarClockIcon,
  ChartNoAxesColumnIncreasingIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersRoundIcon
} from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types';

export const useParentSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`Overview`,
        items: [
          {
            title: msg`Dashboard`,
            url: '/parent/dashboard',
            icon: LayoutDashboardIcon
          }
        ]
      },
      {
        title: msg`Children`,
        items: [
          {
            title: msg`My children`,
            url: '/parent/children',
            icon: UsersRoundIcon
          },
          {
            title: msg`Courses`,
            url: '/parent/children-courses',
            icon: GraduationCapIcon
          },
          {
            title: msg`Progress`,
            url: '/parent/children-progress',
            icon: ChartNoAxesColumnIncreasingIcon
          },
          {
            title: msg`Attendance`,
            url: '/parent/children-attendance',
            icon: ClipboardCheckIcon
          },
          {
            title: msg`Schedule`,
            url: '/parent/schedule',
            icon: CalendarClockIcon
          }
        ]
      },
      {
        title: msg`Account`,
        items: [
          {
            title: msg`Settings`,
            url: '/parent/settings',
            icon: SettingsIcon
          }
        ]
      }
    ]
  };

  return sidebarData;
};
