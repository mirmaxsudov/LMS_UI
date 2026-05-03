type AttendanceStatus = 'ABSENT' | 'EXCUSED' | 'LATE' | 'PRESENT';

interface Attendance {
  groupId: string;
  groupName: string;
  id: string;
  lessonEndTime: string;
  lessonId: string;
  lessonSessionId: string;
  lessonStartTime: string;
  lessonTitle: string;
  status: AttendanceStatus;
  studentFullName: string;
  studentId: string;
  studentProfileId: string;
}

type AttendancesResponse = Pagination<Attendance>;
type AttendanceResponse = ApiResponse<Attendance>;
