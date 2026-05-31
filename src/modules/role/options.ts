import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type { GetRolesRequest } from '@/shared/api';

import { getRoleById, getRoles } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type RoleFiltersParams = Partial<{
  permissionId: string;
  search: string;
}>;

export interface RolesQueryParams {
  filters?: RoleFiltersParams;
  page?: number;
  size?: number;
}

export const ROLE_QUERY_KEYS = {
  all: () => ['roles'] as const,
  allList: (request?: GetRolesRequest) => [...ROLE_QUERY_KEYS.all(), 'list', request] as const,
  infiniteList: (params?: Omit<RolesQueryParams, 'page'>) =>
    [...ROLE_QUERY_KEYS.all(), 'infinite-list', params] as const,
  byId: (id?: string) => [...ROLE_QUERY_KEYS.all(), 'by-id', id] as const
};

export const getRoleQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ROLE_QUERY_KEYS.byId(id),
    queryFn: () => getRoleById({ id }),
    enabled: Boolean(id)
  });

export const getRolesQueryOptions = (params?: RolesQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: ROLE_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getRoles({ params: requestParams })
  });
};

export const getRolesInfiniteQueryOptions = (params?: Omit<RolesQueryParams, 'page'>) =>
  infiniteQueryOptions({
    queryKey: ROLE_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getRoles({
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
