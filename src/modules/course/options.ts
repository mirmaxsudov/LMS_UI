import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type { GetAllCoursesRequest } from '@/shared/api';

import { getAllCourses } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type CourseFiltersParams = Partial<{
  level: CourseLevel;
  maxDuration: number;
  minDuration: number;
  search: string;
}>;

export interface CoursesQueryParams {
  filters?: CourseFiltersParams;
  page?: number;
  size?: number;
}

export const COURSE_QUERY_KEYS = {
  all: () => ['courses'] as const,
  allList: (request?: GetAllCoursesRequest) =>
    [...COURSE_QUERY_KEYS.all(), 'list', request] as const,
  infiniteList: (params?: Omit<CoursesQueryParams, 'page'>) =>
    [...COURSE_QUERY_KEYS.all(), 'infinite-list', params] as const,
  byId: (id?: string) => [...COURSE_QUERY_KEYS.all(), 'by-id', id] as const
};

export const getCoursesQueryOptions = (params?: CoursesQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: COURSE_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getAllCourses({ params: requestParams })
  });
};

export const getCoursesInfiniteQueryOptions = (
  params?: Omit<CoursesQueryParams, 'page'>
) =>
  infiniteQueryOptions({
    queryKey: COURSE_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getAllCourses({
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
