import { api } from '@/shared/api';

interface PutOnlineCourseLessonRequest {
  data: PutOnlineCourseLessonDto;
  lessonId: string;
}

export const putOnlineCourseLesson = ({ data, lessonId }: PutOnlineCourseLessonRequest) =>
  api.put<OnlineCourseModuleResponse>(`online-courses/lessons/${lessonId}`, data);

interface DeleteOnlineCourseLessonRequest {
  lessonId: string;
}

export const deleteOnlineCourseLesson = ({ lessonId }: DeleteOnlineCourseLessonRequest) =>
  api.delete(`online-courses/lessons/${lessonId}`);

interface PostOnlineCourseLessonRequest {
  data: PostOnlineCourseLessonDto;
  moduleId: string;
}

export const postOnlineCourseLesson = ({ moduleId, data }: PostOnlineCourseLessonRequest) =>
  api.post<OnlineCourseModuleResponse>(`online-courses/modules/${moduleId}/lessons`, data);
