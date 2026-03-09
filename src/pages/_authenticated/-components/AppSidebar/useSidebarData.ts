import { msg } from '@lingui/core/macro';
import {
  AwardIcon,
  BarChart3Icon,
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  FileTextIcon,
  GraduationCapIcon,
  HomeIcon,
  MailIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  SettingsIcon,
  ShieldIcon,
  UploadIcon,
  UserIcon
} from 'lucide-react';

import type { SidebarData } from '@/shared/ui/page/types';

export const useSidebarData = () => {
  const sidebarData: SidebarData = {
    navGroups: [
      {
        title: msg`Learning`,
        items: [
          {
            title: msg`Dashboard`,
            url: '/dashboard',
            icon: HomeIcon
          },
          {
            title: msg`My Courses`,
            url: '/courses',
            icon: BookOpenIcon
          },
          {
            title: msg`Course Player`,
            url: '/courses/player',
            icon: BookOpenIcon
          },
          {
            title: msg`Assignments`,
            url: '/assignments',
            icon: FileTextIcon
          },
          {
            title: msg`Submission`,
            url: '/assignments/submission',
            icon: UploadIcon
          },
          {
            title: msg`Discussions`,
            url: '/discussions',
            icon: MessageSquareIcon
          },
          {
            title: msg`Discussion Thread`,
            url: '/discussions/thread',
            icon: MessageSquareIcon
          },
          {
            title: msg`Progress`,
            url: '/progress',
            icon: BarChart3Icon
          },
          {
            title: msg`Notifications`,
            url: '/notifications',
            icon: BellIcon
          },
          {
            title: msg`Calendar`,
            url: '/calendar',
            icon: CalendarIcon
          },
          {
            title: msg`Certificates`,
            url: '/certificates',
            icon: AwardIcon
          },
          {
            title: msg`Profile`,
            url: '/profile',
            icon: UserIcon
          },
          {
            title: msg`Account Settings`,
            url: '/settings/account',
            icon: SettingsIcon
          },
          {
            title: msg`Security`,
            url: '/settings/security',
            icon: ShieldIcon
          }
        ]
      },
      {
        title: msg`Teaching`,
        items: [
          {
            title: msg`Course Management`,
            url: '/teaching/courses',
            icon: GraduationCapIcon
          },
          {
            title: msg`Create Course`,
            url: '/teaching/courses/create',
            icon: PlusCircleIcon
          },
          {
            title: msg`Lesson Manager`,
            url: '/teaching/lessons',
            icon: BookOpenIcon
          },
          {
            title: msg`Assignment Manager`,
            url: '/teaching/assignments',
            icon: FileTextIcon
          },
          {
            title: msg`Student Progress`,
            url: '/teaching/progress',
            icon: BarChart3Icon
          },
          {
            title: msg`Discussion Moderation`,
            url: '/teaching/discussions/moderation',
            icon: MessageSquareIcon
          },
          {
            title: msg`Teacher Messages`,
            url: '/teaching/messages',
            icon: MailIcon
          }
        ]
      },
      {
        title: msg`Family`,
        items: [
          {
            title: msg`Children`,
            url: '/children',
            icon: UserIcon
          },
          {
            title: msg`Child Progress`,
            url: '/children/progress',
            icon: BarChart3Icon
          }
        ]
      }
    ]
  };

  return sidebarData;
};
