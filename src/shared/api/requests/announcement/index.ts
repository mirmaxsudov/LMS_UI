import { api } from '@/shared/api';

export interface GetAnnouncementRequest {
  id: string;
}

export const getAnnouncement = ({ id }: GetAnnouncementRequest) =>
  api.get<AnnouncementResponse>(`announcements/${id}`);

export interface GetAnnouncementsRequest {
  params?: Partial<{
    search: string;
    status: AnnouncementStatus;
    priority: AnnouncementPriority;
    audience: AnnouncementAudience;
    pinned: boolean;
    authorId: string;
  }> &
    PaginationRequest;
}

export const getAnnouncements = (request?: GetAnnouncementsRequest) =>
  api.get<AnnouncementsResponse>('announcements', request);

export const getAnnouncementOverview = () =>
  api.get<AnnouncementOverviewResponse>('announcements/overview');

interface PutAnnouncementRequest {
  data: PutAnnouncementDto;
  id: string;
}

export const putAnnouncement = ({ id, data }: PutAnnouncementRequest) =>
  api.put<AnnouncementResponse>(`announcements/${id}`, data);

interface PostAnnouncementRequest {
  data: PostAnnouncementDto;
}

export const postAnnouncement = ({ data }: PostAnnouncementRequest) =>
  api.post<AnnouncementResponse>('announcements', data);

interface DeleteAnnouncementRequest {
  id: string;
}

export const deleteAnnouncement = ({ id }: DeleteAnnouncementRequest) =>
  api.delete(`announcements/${id}`);

interface PatchAnnouncementViewRequest {
  id: string;
}

export const patchAnnouncementView = ({ id }: PatchAnnouncementViewRequest) =>
  api.patch<AnnouncementResponse>(`announcements/${id}/view`);

interface PatchAnnouncementStatusRequest {
  id: string;
  data: {
    status: AnnouncementStatus;
  };
}

export const patchAnnouncementStatus = ({ id, data }: PatchAnnouncementStatusRequest) =>
  api.patch<AnnouncementResponse>(`announcements/${id}/status`, data);

interface PatchAnnouncementPinnedRequest {
  id: string;
  data: {
    pinned: boolean;
  };
}

export const patchAnnouncementPinned = ({ id, data }: PatchAnnouncementPinnedRequest) =>
  api.patch<AnnouncementResponse>(`announcements/${id}/pin`, data);
