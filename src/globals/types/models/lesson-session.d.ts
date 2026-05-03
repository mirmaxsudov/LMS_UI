type LessonSessionStatus = 'CANCELLED' | 'COMPLETED' | 'PLANNED';

interface LessonSession {
  endTime: string;
  groupId: string;
  groupName: string;
  id: string;
  lessonId: string;
  lessonTitle: string;
  startTime: string;
  status: LessonSessionStatus;
}

type LessonSessionsResponse = Pagination<LessonSession>;
type LessonSessionResponse = ApiResponse<LessonSession>;
