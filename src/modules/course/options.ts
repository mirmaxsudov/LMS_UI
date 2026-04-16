import type { GetAllCoursesRequest } from '@/shared/api';

export const COURSE_QUERY_KEYS = {
  all: () => ['courses'] as const,
  allList: (request?: GetAllCoursesRequest) =>
    [...COURSE_QUERY_KEYS.all(), 'list', request] as const,
  byId: (id?: string) => [...COURSE_QUERY_KEYS.all(), 'by-id', id] as const
};
