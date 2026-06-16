interface ScheduleDto {
  dayOfWeek: DayOfWeek;
  endTime: string;
  groupId: string;
  roomId: string | null;
  startTime: string;
}

type PostScheduleDto = ScheduleDto;
type PutScheduleDto = ScheduleDto;
