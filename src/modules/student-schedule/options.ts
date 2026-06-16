import { queryOptions } from '@tanstack/react-query';

import { getStudentSchedule } from '@/shared/api';

export interface StudentScheduleQueryParams {
  from: string;
  to: string;
}

export const STUDENT_SCHEDULE_QUERY_KEYS = {
  base: () => ['student-schedule'] as const,
  week: (params: StudentScheduleQueryParams) =>
    [...STUDENT_SCHEDULE_QUERY_KEYS.base(), 'week', params] as const
};

export const getStudentScheduleQueryOptions = (params: StudentScheduleQueryParams) =>
  queryOptions({
    queryKey: STUDENT_SCHEDULE_QUERY_KEYS.week(params),
    queryFn: () => getStudentSchedule({ params })
  });
