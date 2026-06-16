interface StudentScheduleClass {
  building: string | null;
  endTime: string;
  groupId: string;
  groupName: string;
  id: string;
  roomName: string | null;
  startTime: string;
  status: LessonSessionStatus;
  subject: string;
  teacherName: string;
  topic: string;
}

interface StudentScheduleDay {
  classes: StudentScheduleClass[];
  date: string;
  dayNumber: number;
  id: string;
  isToday: boolean;
  label: string;
  shortLabel: string;
}

interface StudentScheduleNextClass {
  dayLabel: string;
  startTime: string;
  subject: string;
}

interface StudentScheduleSummary {
  nextClass: StudentScheduleNextClass | null;
  totalClasses: number;
  totalHours: number;
}

interface StudentScheduleWeekRange {
  from: string;
  label: string;
  to: string;
}

interface StudentScheduleWeek {
  days: StudentScheduleDay[];
  summary: StudentScheduleSummary;
  weekRange: StudentScheduleWeekRange;
}

// Responses

type StudentScheduleResponse = ApiResponse<StudentScheduleWeek>;
