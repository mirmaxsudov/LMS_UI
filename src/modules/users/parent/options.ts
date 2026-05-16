import { queryOptions } from '@tanstack/react-query';

import type { ParentFiltersParams, QueryFactoryParams } from '@/features/user';
import type { GetParentRequest } from '@/shared/api';

import { getParents } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const PARENTS_QUERY_KEYS = {
  all: () => ['parents'] as const,
  allList: (request?: GetParentRequest) =>
    [...PARENTS_QUERY_KEYS.all(), 'list', request] as const
};

export const getParentsQueryOptions = (params?: QueryFactoryParams<ParentFiltersParams>) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: PARENTS_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getParents({ params: requestParams })
  });
};
