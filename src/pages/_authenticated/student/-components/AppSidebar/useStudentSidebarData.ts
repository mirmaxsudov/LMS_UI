import { msg } from '@lingui/core/macro';
import {
  BookOpenCheckIcon,
  BookOpenTextIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  ChartNoAxesColumnIncreasingIcon,
  ClapperboardIcon,
  ClipboardCheckIcon,
  FileQuestionIcon,
  FolderOpenIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  ListVideoIcon,
  MessageSquareTextIcon,
  NotebookTextIcon,
  SettingsIcon,
  UsersIcon
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
          },
          {
            title: msg`Assignments`,
            url: '/student/assignments',
            icon: NotebookTextIcon
          },
          {
            title: msg`Quizzes`,
            url: '/student/quizzes',
            icon: FileQuestionIcon
          },
          {
            title: msg`Gradebook`,
            url: '/student/gradebook',
            icon: BookOpenCheckIcon
          },
          {
            title: msg`Materials`,
            url: '/student/materials',
            icon: FolderOpenIcon
          }
        ]
      },
      {
        title: msg`Communication`,
        items: [
          {
            title: msg`Messages`,
            url: '/student/messages',
            icon: MessageSquareTextIcon
          },
          {
            title: msg`Calendar`,
            url: '/student/calendar',
            icon: CalendarDaysIcon
          },
          {
            title: msg`Study groups`,
            url: '/student/study-groups',
            icon: UsersIcon
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
