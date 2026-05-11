import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type {
  GetOnlineCourseEnrollmentsByMeRequest,
  GetOnlineCourseEnrollmentsRequest
} from '@/shared/api';

import { getOnlineCourseEnrollments, getOnlineCourseEnrollmentsByMe } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type OnlineCourseEnrollmentFiltersParams = Partial<{
  courseId: string;
  status: OnlineCourseEnrollmentStatus;
  studentProfileId: string;
}>;

export type OnlineCourseEnrollmentByMeFiltersParams = Partial<{
  status: OnlineCourseEnrollmentStatus;
}>;

export interface OnlineCourseEnrollmentsQueryParams {
  filters?: OnlineCourseEnrollmentFiltersParams;
  page?: number;
  size?: number;
}

export interface OnlineCourseEnrollmentsByMeQueryParams {
  filters?: OnlineCourseEnrollmentByMeFiltersParams;
  page?: number;
  size?: number;
}

export const ONLINE_COURSE_ENROLLMENT_QUERY_KEYS = {
  all: () => ['online-course-enrollments'] as const,
  allList: (request?: GetOnlineCourseEnrollmentsRequest) =>
    [...ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.all(), 'list', request] as const,
  infiniteList: (params?: Omit<OnlineCourseEnrollmentsQueryParams, 'page'>) =>
    [...ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.all(), 'infinite-list', params] as const,
  me: () => [...ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.all(), 'me'] as const,
  meList: (request?: GetOnlineCourseEnrollmentsByMeRequest) =>
    [...ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.me(), 'list', request] as const,
  meInfiniteList: (params?: Omit<OnlineCourseEnrollmentsByMeQueryParams, 'page'>) =>
    [...ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.me(), 'infinite-list', params] as const
};

export const getOnlineCourseEnrollmentsQueryOptions = (
  params?: OnlineCourseEnrollmentsQueryParams
) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getOnlineCourseEnrollments({ params: requestParams })
  });
};

export const getOnlineCourseEnrollmentsInfiniteQueryOptions = (
  params?: Omit<OnlineCourseEnrollmentsQueryParams, 'page'>
) =>
  infiniteQueryOptions({
    queryKey: ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getOnlineCourseEnrollments({
        params: {
          ...(params?.filters ?? {}),
          page: pageParam as number,
          size: params?.size ?? DEFAULT_PAGE_SIZE
        }
      }),
    initialPageParam: DEFAULT_PAGE,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.hasNext ? allPages.length + 1 : undefined
  });

export const getOnlineCourseEnrollmentsByMeQueryOptions = (
  params?: OnlineCourseEnrollmentsByMeQueryParams
) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.meList({ params: requestParams }),
    queryFn: () => getOnlineCourseEnrollmentsByMe({ params: requestParams })
  });
};

export const getOnlineCourseEnrollmentsByMeInfiniteQueryOptions = (
  params?: Omit<OnlineCourseEnrollmentsByMeQueryParams, 'page'>
) =>
  infiniteQueryOptions({
    queryKey: ONLINE_COURSE_ENROLLMENT_QUERY_KEYS.meInfiniteList(params),
    queryFn: ({ pageParam }) =>
      getOnlineCourseEnrollmentsByMe({
        params: {
          ...(params?.filters ?? {}),
          page: pageParam as number,
          size: params?.size ?? DEFAULT_PAGE_SIZE
        }
      }),
    initialPageParam: DEFAULT_PAGE,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.hasNext ? allPages.length + 1 : undefined
  });
