import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type { GetLessonSessionsRequest } from '@/shared/api';

import { getLessonSessions } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type LessonSessionFiltersParams = Partial<{
  from: string;
  groupId: string;
  lessonId: string;
  status: LessonSessionStatus;
  to: string;
}>;

export interface LessonSessionsQueryParams {
  filters?: LessonSessionFiltersParams;
  page?: number;
  size?: number;
}

export const LESSON_SESSION_QUERY_KEYS = {
  base: () => ['lesson-sessions'] as const,
  allList: (request?: GetLessonSessionsRequest) =>
    [...LESSON_SESSION_QUERY_KEYS.base(), 'list', request] as const,
  infiniteList: (params?: Omit<LessonSessionsQueryParams, 'page'>) =>
    [...LESSON_SESSION_QUERY_KEYS.base(), 'infinite-list', params] as const,
  byId: (id?: string) => [...LESSON_SESSION_QUERY_KEYS.base(), 'by-id', id] as const
};

export const getLessonSessionsQueryOptions = (params?: LessonSessionsQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: LESSON_SESSION_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getLessonSessions({ params: requestParams })
  });
};

export const getLessonSessionsInfiniteQueryOptions = (
  params?: Omit<LessonSessionsQueryParams, 'page'>
) =>
  infiniteQueryOptions({
    queryKey: LESSON_SESSION_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getLessonSessions({
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
