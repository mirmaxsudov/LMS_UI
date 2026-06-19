import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import type {GetAnnouncementsRequest} from '@/shared/api';

import { getAnnouncement, getAnnouncementOverview, getAnnouncements   } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 9;

export type AnnouncementFiltersParams = Partial<{
  audience: AnnouncementAudience;
  authorId: string;
  pinned: boolean;
  priority: AnnouncementPriority;
  search: string;
  status: AnnouncementStatus;
}>;

export interface AnnouncementsQueryParams {
  filters?: AnnouncementFiltersParams;
  page?: number;
  size?: number;
}

export const ANNOUNCEMENT_QUERY_KEYS = {
  base: () => ['announcements'] as const,
  allList: (request?: GetAnnouncementsRequest) =>
    [...ANNOUNCEMENT_QUERY_KEYS.base(), 'list', request] as const,
  infiniteList: (params?: Omit<AnnouncementsQueryParams, 'page'>) =>
    [...ANNOUNCEMENT_QUERY_KEYS.base(), 'infinite-list', params] as const,
  byId: (id?: string) => [...ANNOUNCEMENT_QUERY_KEYS.base(), 'by-id', id] as const,
  overview: () => [...ANNOUNCEMENT_QUERY_KEYS.base(), 'overview'] as const
};

export const getAnnouncementOverviewQueryOptions = () =>
  queryOptions({
    queryKey: ANNOUNCEMENT_QUERY_KEYS.overview(),
    queryFn: getAnnouncementOverview
  });

export const getAnnouncementsQueryOptions = (params?: AnnouncementsQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: ANNOUNCEMENT_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getAnnouncements({ params: requestParams })
  });
};

export const getAnnouncementsInfiniteQueryOptions = (
  params?: Omit<AnnouncementsQueryParams, 'page'>
) =>
  infiniteQueryOptions({
    queryKey: ANNOUNCEMENT_QUERY_KEYS.infiniteList(params),
    queryFn: ({ pageParam }) =>
      getAnnouncements({
        params: {
          ...(params?.filters ?? {}),
          page: pageParam as number,
          size: params?.size ?? DEFAULT_PAGE_SIZE
        }
      }),
    initialPageParam: DEFAULT_PAGE,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.hasNext ? allPages.length + 1 : undefined
  });

export const getAnnouncementQueryOptions = (id?: string) =>
  queryOptions({
    queryKey: ANNOUNCEMENT_QUERY_KEYS.byId(id),
    queryFn: () => getAnnouncement({ id: id! }),
    enabled: Boolean(id)
  });
