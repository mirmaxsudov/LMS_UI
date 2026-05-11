interface OnlineCourseLessonDto {
  availableFrom: string;
  content: string;
  description: string;
  durationInMinutes: number;
  freePreview: boolean;
  orderIndex: number;
  status: OnlineCourseContentStatus;
  title: string;
  videoAttachmentId: string;
}

type PostOnlineCourseLessonDto = OnlineCourseLessonDto;
type PutOnlineCourseLessonDto = OnlineCourseLessonDto;
