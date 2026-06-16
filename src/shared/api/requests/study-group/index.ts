import { api } from '@/shared/api';

export interface GetStudyGroupsRequest {
  params?: Partial<{
    search: string;
    status: GroupStatus;
    active: boolean;
    scheduleType: ScheduleType;
    courseId: string;
  }> &
    PaginationRequest;
}

export const getStudyGroups = (request?: GetStudyGroupsRequest) =>
  api.get<StudyGroupsResponse>('students/me/study-groups', { params: request?.params });

export const getStudyGroupOverview = () =>
  api.get<StudyGroupOverviewResponse>('students/me/study-groups/overview');
