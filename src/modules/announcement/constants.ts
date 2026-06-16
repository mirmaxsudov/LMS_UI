import type { LucideIcon } from 'lucide-react';

import {
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
  low: {
    label: 'Low',
    badgeClassName: 'bg-muted text-muted-foreground border-transparent',
    indicatorClassName: 'bg-muted-foreground/40'
  },
  normal: {
    label: 'Normal',
    badgeClassName: 'bg-sky-500/10 text-sky-600 border-transparent dark:text-sky-400',
    indicatorClassName: 'bg-sky-500'
  },
  high: {
    label: 'High',
    badgeClassName: 'bg-amber-500/10 text-amber-600 border-transparent dark:text-amber-400',
    indicatorClassName: 'bg-amber-500'
  },
  urgent: {
    label: 'Urgent',
    badgeClassName: 'bg-destructive/10 text-destructive border-transparent',
    indicatorClassName: 'bg-destructive'
  }
};

export const ANNOUNCEMENT_PRIORITY_ORDER: AnnouncementPriority[] = [
  'urgent',
  'high',
  'normal',
  'low'
];

interface AudienceConfig {
  icon: LucideIcon;
  label: string;
}

export const ANNOUNCEMENT_AUDIENCE_CONFIG: Record<AnnouncementAudience, AudienceConfig> = {
  all: { label: 'Everyone', icon: MegaphoneIcon },
  students: { label: 'Students', icon: GraduationCapIcon },
  teachers: { label: 'Teachers', icon: UsersIcon },
  parents: { label: 'Parents', icon: UsersRoundIcon },
  admins: { label: 'Admins', icon: ShieldCheckIcon }
};

export const ANNOUNCEMENT_AUDIENCE_ORDER: AnnouncementAudience[] = [
  'all',
  'students',
  'teachers',
  'parents',
  'admins'
];

interface StatusConfig {
  badgeVariant: 'default' | 'outline' | 'secondary';
  label: string;
}

export const ANNOUNCEMENT_STATUS_CONFIG: Record<AnnouncementStatus, StatusConfig> = {
  published: { label: 'Published', badgeVariant: 'secondary' },
  scheduled: { label: 'Scheduled', badgeVariant: 'outline' },
  draft: { label: 'Draft', badgeVariant: 'outline' }
};
