interface RoomDto {
  building: string;
  capacity: number;
  description: string;
  floor: number;
  hasComputers: boolean;
  hasProjector: boolean;
  name: string;
  roomType: RoomType;
  status: RoomStatus;
}

type PutRoomDto = RoomDto;

type PostRoomDto = RoomDto;

interface PatchRoomStatusDto {
  status: RoomStatus;
}
