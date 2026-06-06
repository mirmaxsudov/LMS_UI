import { msg } from '@lingui/core/macro';
import {
  BookOpenTextIcon,
  BoxesIcon,
  CalendarClockIcon,
  ChartNoAxesColumnIncreasingIcon,
  ClapperboardIcon,
  ClipboardCheckIcon,
  LayoutDashboardIcon,
  ListVideoIcon,
  SettingsIcon
} from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types';

export const useTeacherSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`Overview`,
        items: [
          {
            title: msg`Dashboard`,
            url: '/teacher/dashboard',
            icon: LayoutDashboardIcon
          },
          {
            title: msg`Teaching progress`,
            url: '/teacher/progress',
            icon: ChartNoAxesColumnIncreasingIcon
          }
        ]
      },
      {
        title: msg`Teaching`,
        items: [
          {
            title: msg`My groups`,
            url: '/teacher/groups',
            icon: BoxesIcon
          },
          {
            title: msg`Lesson sessions`,
            url: '/teacher/lesson-sessions',
            icon: CalendarClockIcon
          },
          {
            title: msg`Lessons`,
            url: '/teacher/lessons',
            icon: ListVideoIcon
          },
          {
            title: msg`Attendance`,
            url: '/teacher/attendance',
            icon: ClipboardCheckIcon
          }
        ]
      },
      {
        title: msg`Content`,
        items: [
          {
            title: msg`Courses`,
            url: '/teacher/courses',
            icon: BookOpenTextIcon
          },
          {
            title: msg`Online courses`,
            url: '/teacher/online-courses',
            icon: ClapperboardIcon
          }
        ]
      },
      {
        title: msg`Account`,
        items: [
          {
            title: msg`Settings`,
            url: '/teacher/settings',
            icon: SettingsIcon
          }
        ]
      }
    ]
  };

  return sidebarData;
};
