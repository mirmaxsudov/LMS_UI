import type { LucideIcon } from 'lucide-react';

import {
  ArchiveIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  UsersIcon,
  UsersRoundIcon
} from 'lucide-react';

interface PriorityConfig {
  /** Tailwind classes for the badge. */
  badgeClassName: string;
  /** Accent color used for the card side indicator. */
  indicatorClassName: string;
  label: string;
}

export const ANNOUNCEMENT_PRIORITY_CONFIG: Record<AnnouncementPriority, PriorityConfig> = {
  NORMAL: {
    label: 'Normal',
    badgeClassName: 'bg-sky-500/10 text-sky-600 border-transparent dark:text-sky-400',
    indicatorClassName: 'bg-sky-500'
  },
  IMPORTANT: {
    label: 'Important',
    badgeClassName: 'bg-amber-500/10 text-amber-600 border-transparent dark:text-amber-400',
    indicatorClassName: 'bg-amber-500'
  },
  URGENT: {
    label: 'Urgent',
    badgeClassName: 'bg-destructive/10 text-destructive border-transparent',
    indicatorClassName: 'bg-destructive'
  }
};

export const ANNOUNCEMENT_PRIORITY_ORDER: AnnouncementPriority[] = [
  'URGENT',
  'IMPORTANT',
  'NORMAL'
];

interface AudienceConfig {
  icon: LucideIcon;
  label: string;
}

export const ANNOUNCEMENT_AUDIENCE_CONFIG: Record<AnnouncementAudience, AudienceConfig> = {
  ALL: { label: 'Everyone', icon: MegaphoneIcon },
  STUDENTS: { label: 'Students', icon: GraduationCapIcon },
  TEACHERS: { label: 'Teachers', icon: UsersIcon },
  PARENTS: { label: 'Parents', icon: UsersRoundIcon },
  ADMINS: { label: 'Admins', icon: ShieldCheckIcon }
};

export const ANNOUNCEMENT_AUDIENCE_ORDER: AnnouncementAudience[] = [
  'ALL',
  'STUDENTS',
  'TEACHERS',
  'PARENTS',
  'ADMINS'
];

interface StatusConfig {
  badgeVariant: 'default' | 'outline' | 'secondary';
  icon: LucideIcon;
  label: string;
}

export const ANNOUNCEMENT_STATUS_CONFIG: Record<AnnouncementStatus, StatusConfig> = {
  PUBLISHED: { label: 'Published', badgeVariant: 'secondary', icon: MegaphoneIcon },
  SCHEDULED: { label: 'Scheduled', badgeVariant: 'outline', icon: MegaphoneIcon },
  DRAFT: { label: 'Draft', badgeVariant: 'outline', icon: MegaphoneIcon },
  ARCHIVED: { label: 'Archived', badgeVariant: 'outline', icon: ArchiveIcon }
};

export const ANNOUNCEMENT_STATUS_ORDER: AnnouncementStatus[] = [
  'PUBLISHED',
  'SCHEDULED',
  'DRAFT',
  'ARCHIVED'
];
