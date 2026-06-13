import { queryOptions } from '@tanstack/react-query';

import { getLoginStatistics } from '@/shared/api';

export const LOGIN_STATISTICS_QUERY_KEYS = {
  base: () => ['login-statistics'] as const
} as const;

export const getLoginStatisticQueryOptions = () =>
  queryOptions({
    queryKey: LOGIN_STATISTICS_QUERY_KEYS.base(),
    queryFn: getLoginStatistics
  });
