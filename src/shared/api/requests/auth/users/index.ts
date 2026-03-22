import { api } from '@/shared/api';

export interface UserPreviewsRequest {
  params: Partial<{
    search: string;
    role: UserRole;
    status: UserStatus;
    permission: string;
  }> &
    PaginationRequest;
}

export const getAllUserPreviews = (request?: UserPreviewsRequest) =>
  api.get<UserPreviewsResponse>('user', {
    params: request?.params
  });

export * from './parent';
export * from './student';
export * from './teacher';
