interface AttendanceNote {
  attendanceId: string;
  groupId: string;
  groupName: string;
  id: string;
  lessonId: string;
  lessonSessionId: string;
  lessonTitle: string;
  note: string;
  studentFullName: string;
  studentProfileId: string;
}

type AttendanceNotesResponse = Pagination<AttendanceNote>;
type AttendanceNoteResponse = ApiResponse<AttendanceNote>;
