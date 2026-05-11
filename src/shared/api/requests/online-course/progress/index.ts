import { api } from '@/shared/api';

interface PatchOnlineCourseLessonProgressRequest {
  data: PatchOnlineCourseProgressDto;
  lessonId: string;
}

export const patchOnlineCourseLessonProgress = ({
  lessonId,
  data
}: PatchOnlineCourseLessonProgressRequest) =>
  api.patch<OnlineCourseProgressResponse>(`online-courses/lessons/${lessonId}/progress`, data);
