interface LessonSessionDto {
  endTime: string;
  groupId: string;
  lessonId: string;
  startTime: string;
  status: LessonSessionStatus;
}

type PostLessonSessionDto = LessonSessionDto;
type PutLessonSessionDto = LessonSessionDto;
