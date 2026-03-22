import { msg } from '@lingui/core/macro';
import { UsersIcon } from 'lucide-react';

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
            icon: UsersIcon,
            items: [
              {
                title: msg`Teachers`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                url: '/user/teachers'
              },
              {
                title: msg`Students`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
                url: '/user/students'
              },
              {
                title: msg`Parents`,
                allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
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
