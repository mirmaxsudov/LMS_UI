type RoomType = 'CLASS_ROOM' | 'COMPUTER_LAB' | 'LECTURE_HALL';
type RoomStatus = 'ACTIVE' | 'INACTIVE' | 'UNDER_MAINTENANCE';

interface Room {
  building: string;
  capacity: number;
  createdAt: string;
  description: string;
  floor: number;
  hasComputers: boolean;
  hasProjector: boolean;
  id: string;
  name: string;
  roomType: RoomType;
  status: RoomStatus;
  updatedAt: string;
}

type RoomsResponse = Pagination<Room>;
type RoomResponse = ApiResponse<Room>;
