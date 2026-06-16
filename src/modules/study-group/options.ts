import { queryOptions } from '@tanstack/react-query';

import type { GetStudyGroupsRequest } from '@/shared/api';

import { getStudyGroupOverview, getStudyGroups } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type StudyGroupFiltersParams = Partial<{
  active: boolean;
  courseId: string;
  scheduleType: ScheduleType;
  search: string;
  status: GroupStatus;
}>;

export interface StudyGroupsQueryParams {
  filters?: StudyGroupFiltersParams;
  page?: number;
  size?: number;
}

export const STUDY_GROUP_QUERY_KEYS = {
  base: () => ['study-groups'] as const,
  allList: (request?: GetStudyGroupsRequest) =>
    [...STUDY_GROUP_QUERY_KEYS.base(), 'list', request] as const,
  overview: () => [...STUDY_GROUP_QUERY_KEYS.base(), 'overview'] as const
};

export const getStudyGroupsQueryOptions = (params?: StudyGroupsQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: STUDY_GROUP_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getStudyGroups({ params: requestParams })
  });
};

export const getStudyGroupOverviewQueryOptions = () =>
  queryOptions({
    queryKey: STUDY_GROUP_QUERY_KEYS.overview(),
    queryFn: () => getStudyGroupOverview()
  });
