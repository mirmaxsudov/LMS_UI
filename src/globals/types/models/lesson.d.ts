interface Lesson {
  content: string;
  durationInMinutes: number;
  id: string;
  sectionId: string;
  sectionTitle: string;
  title: string;
}

interface NextLesson {
  endTime: string;
  lessonId: string;
  lessonSessionId: string;
  startTime: string;
  title: string;
}

type LessonsResponse = Pagination<Lesson>;
type LessonResponse = ApiResponse<Lesson>;
