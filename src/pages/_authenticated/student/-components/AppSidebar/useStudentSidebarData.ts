import { msg } from '@lingui/core/macro';
import {
  AwardIcon,
  BookOpenTextIcon,
  CalendarDaysIcon,
  ClipboardListIcon,
  FileQuestionIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  MessageSquareTextIcon,
  SettingsIcon
} from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types';

export const getStudentSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`Asosiy`,
        items: [
          { title: msg`Bosh sahifa`, url: '/student/dashboard', icon: LayoutDashboardIcon },
          { title: msg`Kurslar katalogi`, url: '/student/course-catalog', icon: BookOpenTextIcon }
        ]
      },
      {
        title: msg`Ta'lim jarayoni`,
        items: [
          { title: msg`Mening kurslarim`, url: '/student/courses', icon: GraduationCapIcon },
          { title: msg`O'quv taqvimi`, url: '/student/schedule', icon: CalendarDaysIcon },
          { title: msg`Testlar`, url: '/student/quizzes', icon: FileQuestionIcon }
        ]
      },
      {
        title: msg`Mening ma'lumotlarim`,
        items: [
          {
            title: msg`Arizalar va hujjatlar`,
            url: '/student/assignments',
            icon: ClipboardListIcon
          },
          { title: msg`Sertifikatlar`, url: '/student/gradebook', icon: AwardIcon },
          { title: msg`Murojaatlar`, url: '/student/messages', icon: MessageSquareTextIcon }
        ]
      },
      {
        title: msg`Akkaunt`,
        items: [{ title: msg`Profil va sozlamalar`, url: '/student/settings', icon: SettingsIcon }]
      }
    ]
  };

  return sidebarData;
};
