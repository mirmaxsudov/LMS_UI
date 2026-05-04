import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type { GetCourseSectionsRequest } from '@/shared/api';

import { getCourseSections } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type CourseSectionFiltersParams = Partial<{
  courseId: string;
  orderIndex: number;
  search: string;
}>;

export interface CourseSectionsQueryParams {
  filters?: CourseSectionFiltersParams;
  page?: number;
  size?: number;
}

export const COURSE_SECTION_QUERY_KEYS = {
  all: () => ['course-sections'] as const,
  allList: (request?: GetCourseSectionsRequest) =>
    [...COURSE_SECTION_QUERY_KEYS.all(), 'list', request] as const,
  infiniteList: (params?: Omit<CourseSectionsQueryParams, 'page'>) =>
    [...COURSE_SECTION_QUERY_KEYS.all(), 'infinite-list', params] as const,
  byId: (id?: string) => [...COURSE_SECTION_QUERY_KEYS.all(), 'by-id', id] as const
};

export const getCourseSectionsQueryOptions = (params?: CourseSectionsQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: COURSE_SECTION_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getCourseSections({ params: requestParams })
  });
};

export const getCourseSectionsInfiniteQueryOptions = (
  params?: Omit<CourseSectionsQueryParams, 'page'>
) =>
  infiniteQueryOptions({
    queryKey: COURSE_SECTION_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getCourseSections({
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
