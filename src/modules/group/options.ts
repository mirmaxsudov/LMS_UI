import type { GetGroupRequest } from '@/shared/api';

export const GROUP_QUERY_KEYS = {
  all: () => ['groups'] as const,
  allList: (request?: GetGroupRequest) => [...GROUP_QUERY_KEYS.all(), 'list', request] as const,
  byId: (id?: string) => [...GROUP_QUERY_KEYS.all(), 'by-id', id] as const
};
