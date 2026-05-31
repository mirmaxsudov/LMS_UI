import { api, apiWithoutAuth } from '@/shared/api';

export interface LoginRequest {
  data: PostLoginDto;
}

export const postLogin = ({ data }: LoginRequest) =>
  apiWithoutAuth.post<ApiResponse<TokenResponse>>('auth/login', data);

export const getAuthMe = () => api.get<User>('auth/me');

export interface PatchAuthMeRequest {
  data: PatchAuthMeDto;
}

export const patchAuthMe = ({ data }: PatchAuthMeRequest) => api.patch('auth/me', data);

export * from './users';
