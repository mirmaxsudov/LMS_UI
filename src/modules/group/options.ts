import { queryOptions } from '@tanstack/react-query';

import type { GetGroupRequest } from '@/shared/api';

import { getGroups } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type GroupFiltersParams = Partial<{
  active: boolean;
  courseId: string;
  maxCapacity: number;
  minCapacity: number;
  search: string;
  status: GroupStatus;
  teacherId: string;
}>;

export interface GroupsQueryParams {
  filters?: GroupFiltersParams;
  page?: number;
  size?: number;
}

export const GROUP_QUERY_KEYS = {
  all: () => ['groups'] as const,
  allList: (request?: GetGroupRequest) => [...GROUP_QUERY_KEYS.all(), 'list', request] as const,
  byId: (id?: string) => [...GROUP_QUERY_KEYS.all(), 'by-id', id] as const
};

export const getGroupsQueryOptions = (params?: GroupsQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: GROUP_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getGroups({ params: requestParams })
  });
};
