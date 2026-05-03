import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type { GetLessonsRequest } from '@/shared/api';

import { getLessons } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type LessonFiltersParams = Partial<{
  maxDuration: number;
  minDuration: number;
  search: string;
  sectionId: string;
}>;

export interface LessonsQueryParams {
  filters?: LessonFiltersParams;
  page?: number;
  size?: number;
}

export const LESSON_QUERY_KEYS = {
  all: () => ['lessons'] as const,
  allList: (request?: GetLessonsRequest) => [...LESSON_QUERY_KEYS.all(), 'list', request] as const,
  infiniteList: (params?: Omit<LessonsQueryParams, 'page'>) =>
    [...LESSON_QUERY_KEYS.all(), 'infinite-list', params] as const,
  byId: (id?: string) => [...LESSON_QUERY_KEYS.all(), 'by-id', id] as const
};

export const getLessonsQueryOptions = (params?: LessonsQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: LESSON_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getLessons({ params: requestParams })
  });
};

export const getLessonsInfiniteQueryOptions = (params?: Omit<LessonsQueryParams, 'page'>) =>
  infiniteQueryOptions({
    queryKey: LESSON_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getLessons({
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
