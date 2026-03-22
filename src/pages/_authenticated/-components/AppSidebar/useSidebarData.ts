import { msg } from '@lingui/core/macro';

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
        title: msg`Family`,
        items: []
      }
    ]
  };

  return sidebarData;
};
