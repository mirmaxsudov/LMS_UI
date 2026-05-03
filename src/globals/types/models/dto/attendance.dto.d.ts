interface AttendanceDto {
  lessonSessionId: string;
  status: AttendanceStatus;
  studentId: string;
}

type PostAttendanceDto = AttendanceDto;
type PutAttendanceDto = AttendanceDto;
