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
