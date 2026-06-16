type AnnouncementPriority = 'high' | 'low' | 'normal' | 'urgent';

type AnnouncementAudience = 'admins' | 'all' | 'parents' | 'students' | 'teachers';

type AnnouncementStatus = 'draft' | 'published' | 'scheduled';

interface AnnouncementAuthor {
  avatarUrl: string | null;
  id: string;
  name: string;
  role: string;
}

interface Announcement {
  audiences: AnnouncementAudience[];
  author: AnnouncementAuthor;
  content: string;
  id: string;
  pinned: boolean;
  priority: AnnouncementPriority;
  publishedAt: string;
  scheduledAt: string | null;
  status: AnnouncementStatus;
  title: string;
  viewsCount: number;
}

interface AnnouncementDraft {
  audiences: AnnouncementAudience[];
  content: string;
  pinned: boolean;
  priority: AnnouncementPriority;
  title: string;
}
