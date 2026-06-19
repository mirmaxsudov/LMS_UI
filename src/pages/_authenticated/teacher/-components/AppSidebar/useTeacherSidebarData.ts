import { msg } from '@lingui/core/macro';
import {
  BookOpenCheckIcon,
  BookOpenTextIcon,
  BoxesIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  ChartNoAxesColumnIncreasingIcon,
  ClapperboardIcon,
  ClipboardCheckIcon,
  FileQuestionIcon,
  FolderOpenIcon,
  LayoutDashboardIcon,
  ListVideoIcon,
  MegaphoneIcon,
  MessageSquareTextIcon,
  NotebookTextIcon,
  SettingsIcon,
  UsersIcon
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
          },
          {
            title: msg`Assignments`,
            url: '/teacher/assignments',
            icon: NotebookTextIcon
          },
          {
            title: msg`Quizzes`,
            url: '/teacher/quizzes',
            icon: FileQuestionIcon
          },
          {
            title: msg`Gradebook`,
            url: '/teacher/gradebook',
            icon: BookOpenCheckIcon
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
          },
          {
            title: msg`Materials`,
            url: '/teacher/materials',
            icon: FolderOpenIcon
          }
        ]
      },
      {
        title: msg`Communication`,
        items: [
          {
            title: msg`Announcements`,
            url: '/teacher/announcements',
            icon: MegaphoneIcon
          },
          {
            title: msg`Messages`,
            url: '/teacher/messages',
            icon: MessageSquareTextIcon
          },
          {
            title: msg`Calendar`,
            url: '/teacher/calendar',
            icon: CalendarDaysIcon
          }
        ]
      },
      {
        title: msg`Account`,
        items: [
          {
            title: msg`Students`,
            url: '/teacher/students',
            icon: UsersIcon
          },
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
