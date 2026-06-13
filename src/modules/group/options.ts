import { queryOptions } from '@tanstack/react-query';

import type { GetGroupRequest, GetGroupStudentsRequest } from '@/shared/api';

import { getGroups, getGroupStudents } from '@/shared/api';

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
  base: () => ['groups'] as const,
  allList: (request?: GetGroupRequest) => [...GROUP_QUERY_KEYS.base(), 'list', request] as const,
  byId: (id?: string) => [...GROUP_QUERY_KEYS.base(), 'by-id', id] as const,
  getGroupStudents: (request: GetGroupStudentsRequest) =>
    [...GROUP_QUERY_KEYS.base(), 'group-students', request] as const
};

export const getGroupStudentsQueryOptions = (request: GetGroupStudentsRequest) =>
  queryOptions({
    queryFn: () => getGroupStudents(request),
    queryKey: GROUP_QUERY_KEYS.getGroupStudents(request)
  });

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
