import { msg } from '@lingui/core/macro';
import {
  AwardIcon,
  BadgeInfoIcon,
  BellIcon,
  BookOpenTextIcon,
  Building2Icon,
  CalendarCheckIcon,
  CalendarDaysIcon,
  ClipboardCheckIcon,
  FileQuestionIcon,
  FileSearchIcon,
  GraduationCapIcon,
  KeyRoundIcon,
  LayoutDashboardIcon,
  ListVideoIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  UserRoundCheckIcon,
  UsersIcon,
  UsersRoundIcon
} from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types';

export const getAdminSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`Nazorat markazi`,
        items: [
          { title: msg`Boshqaruv paneli`, url: '/admin/dashboard', icon: LayoutDashboardIcon }
        ]
      },
      {
        title: msg`O'quv jarayoni`,
        items: [
          {
            title: msg`Kurs arizalari`,
            url: '/admin/assignments',
            icon: ClipboardCheckIcon,
            badge: 24
          },
          {
            title: msg`Hujjatlar tekshiruvi`,
            url: '/admin/gradebook',
            icon: FileSearchIcon,
            badge: 11
          },
          { title: msg`Oflayn qatnashuv`, url: '/admin/attendance', icon: CalendarCheckIcon },
          { title: msg`O'quv taqvimi`, url: '/admin/schedule', icon: CalendarDaysIcon },
          { title: msg`Sertifikatlar`, url: '/admin/certificates', icon: AwardIcon, badge: 7 }
        ]
      },
      {
        title: msg`Kontent`,
        items: [
          { title: msg`Kurslar`, url: '/admin/courses', icon: BookOpenTextIcon },
          { title: msg`Kurs dasturi`, url: '/admin/online-courses', icon: ListVideoIcon },
          { title: msg`Testlar`, url: '/admin/quizzes', icon: FileQuestionIcon },
          { title: msg`E'lonlar`, url: '/admin/announcements', icon: MegaphoneIcon }
        ]
      },
      {
        title: msg`Boshqaruv`,
        items: [
          {
            icon: UsersIcon,
            title: msg`Foydalanuvchilar`,
            items: [
              { title: msg`Barcha foydalanuvchilar`, url: '/admin/user/all', icon: UsersRoundIcon },
              { title: msg`Tinglovchilar`, url: '/admin/user/students', icon: GraduationCapIcon },
              {
                title: msg`Ekspert va o'qituvchilar`,
                url: '/admin/user/teachers',
                icon: UserRoundCheckIcon
              }
            ]
          },
          { title: msg`Hududlar va markazlar`, url: '/admin/rooms', icon: Building2Icon },
          { title: msg`Murojaatlar`, url: '/admin/notifications', icon: BellIcon, badge: 9 },
          {
            icon: BadgeInfoIcon,
            title: msg`Ruxsatlar`,
            items: [
              { title: msg`Rollar`, url: '/admin/roles', icon: ShieldCheckIcon },
              { title: msg`Permissionlar`, url: '/admin/permissions', icon: KeyRoundIcon }
            ]
          }
        ]
      }
    ]
  };

  return sidebarData;
};
