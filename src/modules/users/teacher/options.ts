import type { GetTeachersRequest } from '@/shared/api';

export const TEACHER_QUERY_KEYS = {
  all: (request?: GetTeachersRequest) => ['teachers', request] as const,
  byId: (id: string) => ['teachers', id] as const
};
