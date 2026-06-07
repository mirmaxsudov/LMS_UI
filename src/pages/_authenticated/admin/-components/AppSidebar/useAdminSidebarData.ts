import { msg } from '@lingui/core/macro';
import {
  AwardIcon,
  BadgeInfoIcon,
  BarChart3Icon,
  BellIcon,
  BookOpenTextIcon,
  BoxesIcon,
  CalendarCheckIcon,
  CalendarClockIcon,
  ClapperboardIcon,
  FileQuestionIcon,
  FileTextIcon,
  KeyRoundIcon,
  ListTreeIcon,
  ListVideoIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  User2Icon,
  UsersIcon,
  UsersRoundIcon
} from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types.ts';

export const useAdminSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`LMS`,
        items: [
          {
            title: msg`Courses`,
            url: '/admin/courses',
            icon: BookOpenTextIcon
          },
          {
            title: msg`Course sections`,
            url: '/admin/course-sections',
            icon: ListTreeIcon
          },
          {
            title: msg`Online courses`,
            url: '/admin/online-courses',
            icon: ClapperboardIcon
          },
          {
            title: msg`Groups`,
            url: '/admin/groups',
            icon: BoxesIcon
          },
          {
            title: msg`Lessons`,
            url: '/admin/lessons',
            icon: ListVideoIcon
          },
          {
            title: msg`Lesson sessions`,
            url: '/admin/lesson-sessions',
            icon: CalendarClockIcon
          },
          {
            title: msg`Assignments`,
            url: '/admin/assignments',
            icon: FileTextIcon
          },
          {
            title: msg`Quizzes`,
            url: '/admin/quizzes',
            icon: FileQuestionIcon
          },
          {
            title: msg`Attendance`,
            url: '/admin/attendance',
            icon: CalendarCheckIcon
          },
          {
            title: msg`Gradebook`,
            url: '/admin/gradebook',
            icon: AwardIcon
          }
        ]
      },
      {
        title: msg`Management`,
        items: [
          {
            icon: UsersIcon,
            title: msg`Users`,
            items: [
              {
                title: msg`All users`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                url: '/admin/user/all',
                icon: UsersRoundIcon
              },
              {
                title: msg`Teachers`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                icon: UsersIcon,
                url: '/admin/user/teachers'
              },
              {
                title: msg`Students`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                icon: User2Icon,
                url: '/admin/user/students'
              },
              {
                title: msg`Parents`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                icon: UsersRoundIcon,
                url: '/admin/user/parents'
              }
            ]
          },
          {
            icon: BadgeInfoIcon,
            title: msg`Access control`,
            items: [
              {
                title: msg`Roles`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                url: '/admin/roles',
                icon: ShieldCheckIcon
              },
              {
                title: msg`Permissions`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                url: '/admin/permissions',
                icon: KeyRoundIcon
              }
            ]
          },
          {
            title: msg`Reports`,
            url: '/admin/reports',
            icon: BarChart3Icon
          },
          {
            title: msg`Notifications`,
            url: '/admin/notifications',
            icon: BellIcon
          },
          {
            title: msg`Announcements`,
            url: '/admin/announcements',
            icon: MegaphoneIcon
          }
        ]
      }
    ]
  };

  return sidebarData;
};
