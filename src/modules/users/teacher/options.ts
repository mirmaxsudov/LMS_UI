import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type { QueryFactoryParams, TeacherFiltersParams } from '@/features/user';
import type { GetTeachersRequest } from '@/shared/api';

import { getTeachers } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const TEACHER_QUERY_KEYS = {
  all: () => ['teachers'] as const,
  allList: (request?: GetTeachersRequest) =>
    [...TEACHER_QUERY_KEYS.all(), 'list', request] as const,
  infiniteList: (params?: Omit<QueryFactoryParams<TeacherFiltersParams>, 'page'>) =>
    [...TEACHER_QUERY_KEYS.all(), 'infinite-list', params] as const,
  byId: (id: string) => ['teachers', id] as const
};

export const getTeachersQueryOptions = (params?: QueryFactoryParams<TeacherFiltersParams>) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: TEACHER_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getTeachers({ params: requestParams })
  });
};

export const getTeachersInfiniteQueryOptions = (
  params?: Omit<QueryFactoryParams<TeacherFiltersParams>, 'page'>
) =>
  infiniteQueryOptions({
    queryKey: TEACHER_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getTeachers({
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
