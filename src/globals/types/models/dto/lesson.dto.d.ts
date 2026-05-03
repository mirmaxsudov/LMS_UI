interface LessonDto {
  content: string;
  durationInMinutes: number;
  sectionId: string;
  title: string;
}

type PostLessonDto = LessonDto;
type PutLessonDto = LessonDto;
