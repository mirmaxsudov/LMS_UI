import { api, apiWithoutAuth } from '@/shared/api';

export interface LoginRequest {
  data: PostLoginDto;
}

export const postLogin = ({ data }: LoginRequest) =>
  apiWithoutAuth.post<ApiResponse<TokenResponse>>('auth/login', data);

export const getAuthMe = () => api.get<User>('auth/me');

export interface PatchAuthMeRequest {
  data: {
    brithDate: string;
    email: string;
    firstName: string;
    gender: Gender;
    lastName: string;
    middleName: string;
    phoneNumber: string;
  };
}

export const patchAuthMe = ({ data }: PatchAuthMeRequest) => api.patch('auth/me', data);

export * from './users';
