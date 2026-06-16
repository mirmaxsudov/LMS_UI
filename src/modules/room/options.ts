import { queryOptions } from '@tanstack/react-query';

import type { GetRoomByIdRequest, GetRoomsRequest } from '@/shared/api';

import { getRoomById, getRooms } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type RoomFiltersParams = Partial<{
  building: string;
  floor: number;
  hasComputers: boolean;
  hasProjector: boolean;
  maxCapacity: number;
  minCapacity: number;
  roomType: RoomType;
  search: string;
  status: RoomStatus;
}>;

export interface RoomsQueryParams {
  filters?: RoomFiltersParams;
  page?: number;
  size?: number;
}

export const ROOM_QUERY_KEYS = {
  base: () => ['rooms'] as const,
  allList: (request?: GetRoomsRequest) => [...ROOM_QUERY_KEYS.base(), 'list', request] as const,
  byId: (id?: string) => [...ROOM_QUERY_KEYS.base(), 'by-id', id] as const
};

export const getRoomsQueryOptions = (params?: RoomsQueryParams) => {
  const requestParams = {
    ...(params?.filters ?? {}),
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: ROOM_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getRooms({ params: requestParams })
  });
};

export const getRoomByIdQueryOptions = ({ id }: GetRoomByIdRequest) =>
  queryOptions({
    queryKey: ROOM_QUERY_KEYS.byId(id),
    queryFn: () => getRoomById({ id })
  });
