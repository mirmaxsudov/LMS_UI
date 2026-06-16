import { api } from '@/shared/api';

export interface GetRoomByIdRequest {
  id: string;
}

export const getRoomById = ({ id }: GetRoomByIdRequest) => api.get<RoomResponse>(`rooms/${id}`);

export interface GetRoomsRequest {
  params?: Partial<{
    search: string;
    roomType: RoomType;
    status: RoomStatus;
    building: string;
    floor: number;
    minCapacity: number;
    maxCapacity: number;
    hasProjector: boolean;
    hasComputers: boolean;
  }> &
    PaginationRequest;
}

export const getRooms = (request?: GetRoomsRequest) => api.get<RoomsResponse>('rooms', request);

interface PutRoomRequest {
  data: PutRoomDto;
  id: string;
}

export const putRoom = ({ id, data }: PutRoomRequest) => api.put<RoomResponse>(`rooms/${id}`, data);

interface DeleteRoomRequest {
  id: string;
}

export const deleteRoom = ({ id }: DeleteRoomRequest) => api.delete(`rooms/${id}`);

interface PostRoomRequest {
  data: PostRoomDto;
}

export const postRoom = ({ data }: PostRoomRequest) => api.post<RoomResponse>('rooms', data);

interface PatchRoomRequest {
  data: PatchRoomStatusDto;
  id: string;
}

export const patchRoomStatus = ({ id, data }: PatchRoomRequest) =>
  api.patch<RoomResponse>(`rooms/${id}/status`, data);
