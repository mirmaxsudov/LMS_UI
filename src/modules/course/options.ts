import type { GetAllCoursesRequest } from '@/shared/api';

export const COURSE_QUERY_KEYS = {
  all: (request?: GetAllCoursesRequest) => ['courses', 'list', request] as const,
  byId: (id?: string) => ['courses', 'by-id', id] as const
};
