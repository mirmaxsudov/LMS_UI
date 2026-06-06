import { msg } from '@lingui/core/macro';
import {
  BadgeInfoIcon,
  BookOpenTextIcon,
  BoxesIcon,
  CalendarClockIcon,
  ClapperboardIcon,
  KeyRoundIcon,
  ListTreeIcon,
  ListVideoIcon,
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
          }
        ]
      }
    ]
  };

  return sidebarData;
};
