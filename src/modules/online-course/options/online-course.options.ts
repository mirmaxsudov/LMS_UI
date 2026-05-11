import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type { GetOnlineCoursesRequest } from '@/shared/api';

import { getOnlineCourseById, getOnlineCourses } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type OnlineCourseFiltersParams = Partial<{
  createdById: string;
  level: CourseLevel;
  maxDuration: number;
  minDuration: number;
  search: string;
  status: OnlineCourseStatus;
}>;

export interface OnlineCoursesQueryParams {
  filters?: OnlineCourseFiltersParams;
  page?: number;
  size?: number;
}

export const ONLINE_COURSE_QUERY_KEYS = {
  all: () => ['online-courses'] as const,
  allList: (request?: GetOnlineCoursesRequest) =>
    [...ONLINE_COURSE_QUERY_KEYS.all(), 'list', request] as const,
  infiniteList: (params?: Omit<OnlineCoursesQueryParams, 'page'>) =>
    [...ONLINE_COURSE_QUERY_KEYS.all(), 'infinite-list', params] as const,
  byId: (courseId?: string) => [...ONLINE_COURSE_QUERY_KEYS.all(), 'by-id', courseId] as const
};

export const getOnlineCourseQueryOptions = (courseId: string) =>
  queryOptions({
    queryKey: ONLINE_COURSE_QUERY_KEYS.byId(courseId),
    queryFn: () => getOnlineCourseById({ courseId }),
    enabled: Boolean(courseId)
  });

export const getOnlineCoursesQueryOptions = (params?: OnlineCoursesQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: ONLINE_COURSE_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getOnlineCourses({ params: requestParams })
  });
};

export const getOnlineCoursesInfiniteQueryOptions = (
  params?: Omit<OnlineCoursesQueryParams, 'page'>
) =>
  infiniteQueryOptions({
    queryKey: ONLINE_COURSE_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getOnlineCourses({
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
