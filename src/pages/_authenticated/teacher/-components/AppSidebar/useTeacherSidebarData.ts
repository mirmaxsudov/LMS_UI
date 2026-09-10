import { msg } from '@lingui/core/macro';
import {
  BookOpenTextIcon,
  CalendarDaysIcon,
  LayoutDashboardIcon,
  MessageSquareTextIcon,
  SettingsIcon,
  UsersRoundIcon
} from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types';

export const getTeacherSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`Ekspert markazi`,
        items: [
          { title: msg`Bosh sahifa`, url: '/teacher/dashboard', icon: LayoutDashboardIcon },
          {
            title: msg`Murojaatlar`,
            url: '/teacher/messages',
            icon: MessageSquareTextIcon,
            badge: 3
          },
          { title: msg`Javoblar tarixi`, url: '/teacher/progress', icon: UsersRoundIcon }
        ]
      },
      {
        title: msg`O'qituvchi`,
        items: [
          { title: msg`Biriktirilgan kurslar`, url: '/teacher/courses', icon: BookOpenTextIcon },
          { title: msg`Taqvim`, url: '/teacher/calendar', icon: CalendarDaysIcon }
        ]
      },
      {
        title: msg`Akkaunt`,
        items: [{ title: msg`Profil va mavjudlik`, url: '/teacher/settings', icon: SettingsIcon }]
      }
    ]
  };

  return sidebarData;
};
