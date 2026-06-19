interface AnnouncementDto {
  audiences: AnnouncementAudience[];
  content: string;
  pinned: boolean;
  priority: AnnouncementPriority;
  publishedAt: string;
  status: AnnouncementStatus;
  title: string;
}

type PostAnnouncementDto = AnnouncementDto;
type PutAnnouncementDto = AnnouncementDto;
