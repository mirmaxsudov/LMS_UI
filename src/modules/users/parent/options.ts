import type { GetParentRequest } from '@/shared/api';

export const PARENTS_QUERY_KEYS = {
  all: (request?: GetParentRequest) => ['parents', request] as const
};
