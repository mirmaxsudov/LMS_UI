interface GroupDto {
  active: boolean;
  capacity: number;
  courseId: string;
  name: string;
  scheduleDays: DayOfWeek[];
  scheduleType: ScheduleType;
  status: GroupStatus;
  teacherId: string;
}

type PostGroupDto = GroupDto;
type PutGroupDto = GroupDto;

interface PostGroupStartDto {
  schedules: {
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
  }[];
}

interface PostGenerateLessonSessionsDto {
  fromDate: string;
  toDate: string;
}

interface PatchAddStudentToGroupDto {
  studentIds: string[];
}
