import { api } from '@/shared/api';

export interface GetGroupRequest {
  params: Partial<{
    search: string;
    courseId: string;
    teacherId: string;
    status: GroupStatus;
    active: boolean;
    minCapacity: number;
    maxCapacity: number;
  }> &
    PaginationRequest;
}

export const getGroups = (request?: GetGroupRequest) =>
  api.get<GroupsResponse>('groups', {
    params: request?.params
  });

export interface GetGroupByIdRequest {
  id: string;
}

export const getGroupById = ({ id }: GetGroupByIdRequest) => api.get<GroupResponse>(`groups/${id}`);

interface PostGroupRequest {
  data: PostGroupDto;
}

export const postGroup = ({ data }: PostGroupRequest) => api.post('groups', data);

interface PutGroupRequest {
  data: PutGroupDto;
  id: string;
}

export const putGroup = ({ id, data }: PutGroupRequest) => api.put(`groups/${id}`, data);

interface DeleteGroupRequest {
  id: string;
}

export const deleteGroup = ({ id }: DeleteGroupRequest) => api.delete(`groups/${id}`);

interface PostGroupStartRequest {
  data: PostGroupStartDto;
  id: string;
}

export const postGroupStart = ({ id, data }: PostGroupStartRequest) =>
  api.post(`groups/${id}/start`, data);

interface PostGenerateLessonSessionsRequest {
  id: string;
}

export const postGenerateLessonSessions = ({ id }: PostGenerateLessonSessionsRequest) =>
  api.post<ApiResponse<LessonSession[]>>(`groups/${id}/lesson-sessions/generate`);
