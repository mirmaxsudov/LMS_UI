import { msg } from '@lingui/core/macro';
import {
  BookOpenTextIcon,
  BoxesIcon,
  CalendarClockIcon,
  ListTreeIcon,
  ListVideoIcon,
  User2Icon,
  UsersIcon,
  UsersRoundIcon
} from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types';

export const useSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`LMS`,
        items: [
          {
            title: msg`Courses`,
            url: '/courses',
            icon: BookOpenTextIcon
          },
          {
            title: msg`Course sections`,
            url: '/course-sections',
            icon: ListTreeIcon
          },
          {
            title: msg`Groups`,
            url: '/groups',
            icon: BoxesIcon
          },
          {
            title: msg`Lessons`,
            url: '/lessons',
            icon: ListVideoIcon
          },
          {
            title: msg`Lesson sessions`,
            url: '/lesson-sessions',
            icon: CalendarClockIcon
          }
        ]
      },
      {
        title: msg`Management`,
        items: [
          {
            title: msg`Users`,
            items: [
              {
                title: msg`All users`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                url: '/user/all',
                icon: UsersRoundIcon
              },
              {
                title: msg`Teachers`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                icon: UsersIcon,
                url: '/user/teachers'
              },
              {
                title: msg`Students`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                icon: User2Icon,
                url: '/user/students'
              },
              {
                title: msg`Parents`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                icon: UsersRoundIcon,
                url: '/user/parents'
              }
            ]
          }
        ]
      }
    ]
  };

  return sidebarData;
};
