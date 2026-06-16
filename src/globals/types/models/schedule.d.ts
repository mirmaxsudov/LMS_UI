type DayOfWeek = 'FRIDAY' | 'MONDAY' | 'SATURDAY' | 'SUNDAY' | 'THURSDAY' | 'TUESDAY' | 'WEDNESDAY';

interface Schedule {
  dayOfWeek: DayOfWeek;
  endTime: string;
  groupId: string;
  groupName: string;
  id: string;
  roomId: string | null;
  roomName: string | null;
  startTime: string;
}

// Responses

type SchedulesResponse = Pagination<Schedule>;
type ScheduleResponse = ApiResponse<Schedule>;
