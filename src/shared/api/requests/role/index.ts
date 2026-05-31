import { api } from '@/shared/api';

export interface GetRolesRequest {
  params?: Partial<{
    permissionId: string;
    search: string;
  }> &
    PaginationRequest;
}

export const getRoles = (request?: GetRolesRequest) =>
  api.get<RolesResponse>('roles', {
    params: request?.params
  });

export interface GetRoleByIdRequest {
  id: string;
}

export const getRoleById = ({ id }: GetRoleByIdRequest) =>
  api.get<RoleResponse>(`roles/${id}`);

interface PostRoleRequest {
  data: PostRoleDto;
}

export const postRole = ({ data }: PostRoleRequest) =>
  api.post<RoleResponse>('roles', data);

interface PutRoleRequest {
  data: PutRoleDto;
  id: string;
}

export const putRole = ({ id, data }: PutRoleRequest) =>
  api.put<RoleResponse>(`roles/${id}`, data);

interface DeleteRoleRequest {
  id: string;
}

export const deleteRole = ({ id }: DeleteRoleRequest) =>
  api.delete<ApiResponse<null>>(`roles/${id}`);
