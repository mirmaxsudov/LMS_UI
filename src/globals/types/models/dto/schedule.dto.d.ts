interface ScheduleDto {
  dayOfWeek: DayOfWeek;
  endTime: string;
  groupId: string;
  startTime: string;
}

type PostScheduleDto = ScheduleDto;
type PutScheduleDto = ScheduleDto;
