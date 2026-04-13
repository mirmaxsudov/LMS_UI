import type { UserPreviewsRequest } from '@/shared/api';

export const ALL_USERS_QUERY_KEYS = {
  all: (request?: UserPreviewsRequest) => ['users', 'all', request] as const,
  byId: (id: string) => ['users', id] as const
};
