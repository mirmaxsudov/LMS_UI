import { queryOptions } from '@tanstack/react-query';

import type { GetGlobalSearchRequest } from '@/shared/api';

import { getGlobalSearch } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;

export interface GlobalSearchQueryParams {
  page?: number;
  query: string;
  size?: number;
  types?: SearchResultType[];
}

export const SEARCH_QUERY_KEYS = {
  all: () => ['search'] as const,
  global: (request: GetGlobalSearchRequest) =>
    [...SEARCH_QUERY_KEYS.all(), 'global', request] as const
};

export const getGlobalSearchQueryOptions = (params: GlobalSearchQueryParams) => {
  const requestParams = {
    page: params.page ?? DEFAULT_PAGE,
    query: params.query,
    size: params.size ?? DEFAULT_PAGE_SIZE,
    types: params.types
  };

  return queryOptions({
    queryKey: SEARCH_QUERY_KEYS.global({ params: requestParams }),
    queryFn: ({ signal }) =>
      getGlobalSearch({
        params: requestParams,
        signal
      })
  });
};
