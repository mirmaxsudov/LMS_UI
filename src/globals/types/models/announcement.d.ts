type AnnouncementPriority = 'IMPORTANT' | 'NORMAL' | 'URGENT';

type AnnouncementAudience = 'ADMINS' | 'ALL' | 'PARENTS' | 'STUDENTS' | 'TEACHERS';

type AnnouncementStatus = 'ARCHIVED' | 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';

interface Announcement {
  audiences: AnnouncementAudience[];
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
  id: string;
  pinned: boolean;
  priority: AnnouncementPriority;
  publishedAt: string | null;
  status: AnnouncementStatus;
  title: string;
  updatedAt: string;
  viewCount: number;
}

interface AnnouncementDraft {
  audiences: AnnouncementAudience[];
  content: string;
  pinned: boolean;
  priority: AnnouncementPriority;
  title: string;
}

type AnnouncementResponse = ApiResponse<Announcement>;
type AnnouncementsResponse = Pagination<Announcement>;

interface AnnouncementOverviewResponse {
  pinned: number;
  published: number;
  scheduled: number;
  totalReach: number;
}
