import { msg } from '@lingui/core/macro';
import { User2Icon, UsersIcon, UsersRoundIcon } from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types';

export const useSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`Learning`,
        items: []
      },
      {
        title: msg`Teaching`,
        items: []
      },
      {
        title: msg`System`,
        items: [
          {
            title: msg`Users`,
            items: [
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
