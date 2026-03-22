import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';
import Cookies from 'js-cookie';

import { COOKIES } from '@/shared/constants';

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL
});

const apiWithoutAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _isRetry?: boolean;
};

// const refreshPromise: Promise<TokenResponse | null> | null = null;

// const setAuthTokens = ({ accessToken }: TokenResponse) => {
//   Cookies.set(COOKIES.ACCESS_TOKEN, accessToken, { expires: 7 });
// };

const clearAuthTokens = () => {
  Cookies.remove(COOKIES.ACCESS_TOKEN);
};

const redirectToLogin = () => {
  if (typeof window === 'undefined') return;
  if (location.pathname !== '/login') location.href = '/login';
};

const isRefreshRequest = (url?: string) =>
  url?.includes('authentication/user/token-refresh/') ?? false;

const isAuthEndpointRequest = (url?: string) =>
  url?.includes('authentication/user/login/') ||
  url?.includes('authentication/user/register/') ||
  url?.includes('authentication/user/otp/') ||
  isRefreshRequest(url) ||
  false;

// const getRefreshedTokens = async (): Promise<TokenResponse | null> => {
//   const refreshToken = Cookies.get(COOKIES.REFRESH_TOKEN);
//   if (!refreshToken) return null;
//
//   if (!refreshPromise) {
//     refreshPromise = axios
//       .post<ApiResponse<TokenResponse>>(
//         'authentication/user/token-refresh/',
//         { refresh_token: refreshToken },
//         {
//           baseURL: import.meta.env.VITE_API_URL,
//           withCredentials: true,
//           headers: Cookies.get(COOKIES.LOCALE)
//             ? {
//                 'Accept-Language': Cookies.get(COOKIES.LOCALE)
//               }
//             : undefined
//         }
//       )
//       .then((response) => response.data.result)
//       .then((tokens) => {
//         setAuthTokens(tokens);
//         return tokens;
//       })
//       .catch(() => {
//         clearAuthTokens();
//         return null;
//       })
//       .finally(() => {
//         refreshPromise = null;
//       });
//   }
//
//   return refreshPromise;
// };

api.interceptors.request.use((config) => {
  const token = Cookies.get(COOKIES.ACCESS_TOKEN);
  const locale = Cookies.get(COOKIES.LOCALE);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (locale) config.headers['Accept-Language'] = locale;
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const axiosError = error as AxiosError;
    const originalRequest = axiosError.config as RetryableRequestConfig | undefined;
    const status = axiosError.response?.status;

    if (!originalRequest || status !== 401) throw error;

    if (isAuthEndpointRequest(originalRequest.url)) {
      clearAuthTokens();
      if (isRefreshRequest(originalRequest.url)) redirectToLogin();
      throw error;
    }

    if (originalRequest._isRetry) {
      clearAuthTokens();
      redirectToLogin();
      throw error;
    }

    // const refreshedTokens = await getRefreshedTokens();

    // if (!refreshedTokens) {
    //   redirectToLogin();
    //   throw error;
    // }

    originalRequest._isRetry = true;
    originalRequest.headers = originalRequest.headers ?? {};
    // originalRequest.headers.Authorization = `Bearer ${refreshedTokens.access_token}`;
    return api(originalRequest);
  }
);

export { api, apiWithoutAuth };
