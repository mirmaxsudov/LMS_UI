import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type { GetPermissionsRequest } from '@/shared/api';

import { getPermissionById, getPermissions } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type PermissionFiltersParams = Partial<{
  action: string;
  category: PermissionCategory;
  isSystem: boolean;
  module: string;
  search: string;
}>;

export interface PermissionsQueryParams {
  filters?: PermissionFiltersParams;
  page?: number;
  size?: number;
}

export const PERMISSION_QUERY_KEYS = {
  all: () => ['permissions'] as const,
  allList: (request?: GetPermissionsRequest) =>
    [...PERMISSION_QUERY_KEYS.all(), 'list', request] as const,
  infiniteList: (params?: Omit<PermissionsQueryParams, 'page'>) =>
    [...PERMISSION_QUERY_KEYS.all(), 'infinite-list', params] as const,
  byId: (id?: string) => [...PERMISSION_QUERY_KEYS.all(), 'by-id', id] as const
};

export const getPermissionQueryOptions = (id: string) =>
  queryOptions({
    queryKey: PERMISSION_QUERY_KEYS.byId(id),
    queryFn: () => getPermissionById({ id }),
    enabled: Boolean(id)
  });

export const getPermissionsQueryOptions = (params?: PermissionsQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: PERMISSION_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getPermissions({ params: requestParams })
  });
};

export const getPermissionsInfiniteQueryOptions = (
  params?: Omit<PermissionsQueryParams, 'page'>
) =>
  infiniteQueryOptions({
    queryKey: PERMISSION_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getPermissions({
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
