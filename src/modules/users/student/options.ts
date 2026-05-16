import { queryOptions } from '@tanstack/react-query';

import type { QueryFactoryParams, StudentFiltersParams } from '@/features/user';
import type { GetStudentsRequest } from '@/shared/api';

import { getStudents } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const STUDENTS_QUERY_KEYS = {
  all: () => ['students'] as const,
  allList: (request?: GetStudentsRequest) =>
    [...STUDENTS_QUERY_KEYS.all(), 'list', request] as const,
  byId: (id: string) => ['students', id] as const
};

export const getStudentsQueryOptions = (params?: QueryFactoryParams<StudentFiltersParams>) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: STUDENTS_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getStudents({ params: requestParams })
  });
};
