import { api, apiWithoutAuth } from '@/shared/api';

export interface LoginRequest {
  data: PostLoginDto;
}

export const postLogin = ({ data }: LoginRequest) =>
  apiWithoutAuth.post<ApiResponse<TokenResponse>>('auth/login', data);

export const getAuthMe = () => api.get<User>('auth/me');

export * from './users';
