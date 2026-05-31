import { api } from '@/shared/api';

export interface GetPermissionsRequest {
  params?: Partial<{
    action: string;
    category: PermissionCategory;
    isSystem: boolean;
    module: string;
    search: string;
  }> &
    PaginationRequest;
}

export const getPermissions = (request?: GetPermissionsRequest) =>
  api.get<PermissionsResponse>('permissions', {
    params: request?.params
  });

export interface GetPermissionByIdRequest {
  id: string;
}

export const getPermissionById = ({ id }: GetPermissionByIdRequest) =>
  api.get<PermissionResponse>(`permissions/${id}`);

interface PostPermissionRequest {
  data: PostPermissionDto;
}

export const postPermission = ({ data }: PostPermissionRequest) =>
  api.post<PermissionResponse>('permissions', data);

interface PutPermissionRequest {
  data: PutPermissionDto;
  id: string;
}

export const putPermission = ({ id, data }: PutPermissionRequest) =>
  api.put<PermissionResponse>(`permissions/${id}`, data);

interface DeletePermissionRequest {
  id: string;
}

export const deletePermission = ({ id }: DeletePermissionRequest) =>
  api.delete<ApiResponse<null>>(`permissions/${id}`);
