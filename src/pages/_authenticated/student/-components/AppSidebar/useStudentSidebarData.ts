import { msg } from '@lingui/core/macro';
import {
  BookOpenTextIcon,
  CalendarClockIcon,
  ChartNoAxesColumnIncreasingIcon,
  ClapperboardIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  ListVideoIcon,
  SettingsIcon
} from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types';

export const useStudentSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`Overview`,
        items: [
          {
            title: msg`Dashboard`,
            url: '/student/dashboard',
            icon: LayoutDashboardIcon
          },
          {
            title: msg`My progress`,
            url: '/student/progress',
            icon: ChartNoAxesColumnIncreasingIcon
          }
        ]
      },
      {
        title: msg`Learning`,
        items: [
          {
            title: msg`My courses`,
            url: '/student/courses',
            icon: GraduationCapIcon
          },
          {
            title: msg`Online courses`,
            url: '/student/online-courses',
            icon: ClapperboardIcon
          },
          {
            title: msg`Lessons`,
            url: '/student/lessons',
            icon: ListVideoIcon
          },
          {
            title: msg`Schedule`,
            url: '/student/schedule',
            icon: CalendarClockIcon
          },
          {
            title: msg`Attendance`,
            url: '/student/attendance',
            icon: ClipboardCheckIcon
          },
          {
            title: msg`Course catalog`,
            url: '/student/course-catalog',
            icon: BookOpenTextIcon
          }
        ]
      },
      {
        title: msg`Account`,
        items: [
          {
            title: msg`Settings`,
            url: '/student/settings',
            icon: SettingsIcon
          }
        ]
      }
    ]
  };

  return sidebarData;
};
