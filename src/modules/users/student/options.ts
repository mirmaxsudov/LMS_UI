import type { GetStudentsRequest } from '@/shared/api';

export const STUDENTS_QUERY_KEYS = {
  all: (request?: GetStudentsRequest) => ['students', request] as const,
  byId: (id: string) => ['students', id] as const
};
