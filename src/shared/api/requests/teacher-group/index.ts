import { api } from '@/shared/api';

export interface GetTeacherGroupsRequest {
  params?: Partial<{
    search: string;
    courseId: string;
  }> &
    PaginationRequest;
}

export const getTeacherGroups = (request?: GetTeacherGroupsRequest) =>
  api.get<TeacherGroupsResponse>('teachers/me/groups', request);

export interface GetTeacherGroupStudentOverviewRequest {
  groupId: string;
}

export const getTeacherGroupStudentOverview = ({
  groupId
}: GetTeacherGroupStudentOverviewRequest) =>
  api.get<TeacherGroupStudentOverviewResponse>(`teachers/me/groups/${groupId}/students`);
