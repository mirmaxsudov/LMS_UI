import { queryOptions } from '@tanstack/react-query';

import type { GetSchedulesRequest } from '@/shared/api';

import { getSchedules } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type ScheduleFiltersParams = Partial<{
  dayOfWeek: DayOfWeek;
  groupId: string;
}>;

export interface SchedulesQueryParams {
  filters?: ScheduleFiltersParams;
  page?: number;
  size?: number;
}

export const SCHEDULE_QUERY_KEYS = {
  all: () => ['schedules'] as const,
  allList: (request?: GetSchedulesRequest) =>
    [...SCHEDULE_QUERY_KEYS.all(), 'list', request] as const,
  byId: (id?: string) => [...SCHEDULE_QUERY_KEYS.all(), 'by-id', id] as const
};

export const getSchedulesQueryOptions = (params?: SchedulesQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: SCHEDULE_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getSchedules({ params: requestParams })
  });
};
