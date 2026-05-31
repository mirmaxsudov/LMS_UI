import { api, apiWithoutAuth } from '@/shared/api';

export interface LoginRequest {
  data: PostLoginDto;
}

export const postLogin = ({ data }: LoginRequest) =>
  apiWithoutAuth.post<ApiResponse<TokenResponse>>('auth/login', data);

export const getAuthMe = () => api.get<UserResponse>('auth/me');

export interface PatchAuthMeRequest {
  data: FormData | PatchAuthMeDto;
}

export const patchAuthMe = ({ data }: PatchAuthMeRequest) =>
  api.patch<UserResponse>('auth/me', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export * from './users';
