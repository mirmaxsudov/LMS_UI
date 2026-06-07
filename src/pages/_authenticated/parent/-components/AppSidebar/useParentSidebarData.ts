import { msg } from '@lingui/core/macro';
import {
  BellIcon,
  BookOpenCheckIcon,
  CalendarCheckIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  ChartNoAxesColumnIncreasingIcon,
  ClipboardCheckIcon,
  CreditCardIcon,
  FileQuestionIcon,
  FolderOpenIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  MessageSquareTextIcon,
  NotebookTextIcon,
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
          },
          {
            title: msg`Notifications`,
            url: '/parent/notifications',
            icon: BellIcon
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
          },
          {
            title: msg`Assignments`,
            url: '/parent/children-assignments',
            icon: NotebookTextIcon
          },
          {
            title: msg`Quizzes`,
            url: '/parent/children-quizzes',
            icon: FileQuestionIcon
          },
          {
            title: msg`Gradebook`,
            url: '/parent/children-gradebook',
            icon: BookOpenCheckIcon
          },
          {
            title: msg`Materials`,
            url: '/parent/children-materials',
            icon: FolderOpenIcon
          }
        ]
      },
      {
        title: msg`Communication`,
        items: [
          {
            title: msg`Messages`,
            url: '/parent/messages',
            icon: MessageSquareTextIcon
          },
          {
            title: msg`Calendar`,
            url: '/parent/calendar',
            icon: CalendarDaysIcon
          },
          {
            title: msg`Meetings`,
            url: '/parent/meetings',
            icon: CalendarCheckIcon
          }
        ]
      },
      {
        title: msg`Account`,
        items: [
          {
            title: msg`Payments`,
            url: '/parent/payments',
            icon: CreditCardIcon
          },
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
