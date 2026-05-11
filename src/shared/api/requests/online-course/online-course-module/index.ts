import { api } from '@/shared/api';

interface PutOnlineCourseModuleRequest {
  data: PutOnlineCourseModuleDto;
  moduleId: string;
}

export const putOnlineCourseModule = ({ data, moduleId }: PutOnlineCourseModuleRequest) =>
  api.put<OnlineCourseModuleResponse>(`online-courses/modules/${moduleId}`, data);

interface DeleteOnlineCourseModuleRequest {
  moduleId: string;
}

export const deleteOnlineCourseModule = ({ moduleId }: DeleteOnlineCourseModuleRequest) =>
  api.delete(`online-courses/modules/${moduleId}`);

interface PostOnlineCourseModuleRequest {
  courseId: string;
  data: PostOnlineCourseModuleDto;
}

export const postOnlineCourseModule = ({ courseId, data }: PostOnlineCourseModuleRequest) =>
  api.post<OnlineCourseModuleResponse>(`online-courses/${courseId}/modules`, data);
