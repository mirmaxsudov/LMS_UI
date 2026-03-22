import { api } from '@/shared/api';

export interface GetParentRequest {
  params?: Partial<{
    childName: string;
    name: string;
  }> &
    PaginationRequest;
}

export const getParents = (request?: GetParentRequest) =>
  api.get<ParentsResponse>('parent', { params: request?.params });
