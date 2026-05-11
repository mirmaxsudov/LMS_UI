import { api } from '@/shared/api';

export interface GetOnlineCourseByIdRequest {
  courseId: string;
}

export const getOnlineCourseById = ({ courseId }: GetOnlineCourseByIdRequest) =>
  api.get<OnlineCourseResponse>(`online-courses/${courseId}`);

export interface GetOnlineCoursesRequest {
  params?: Partial<{
    search: string;
    level: CourseLevel;
    status: OnlineCourseStatus;
    createdById: string;
    minDuration: number;
    maxDuration: number;
  }> &
    PaginationRequest;
}

export const getOnlineCourses = (request?: GetOnlineCoursesRequest) =>
  api.get<OnlineCoursePreviewsResponse>('online-courses', {
    params: request?.params
  });

interface PutOnlineCourseRequest {
  courseId: string;
  data: PutOnlineCourseDto;
}

export const putOnlineCourse = ({ courseId, data }: PutOnlineCourseRequest) =>
  api.put<OnlineCourseResponse>(`online-courses/${courseId}`, data);

interface DeleteOnlineCourseRequest {
  courseId: string;
}

export const deleteOnlineCourse = ({ courseId }: DeleteOnlineCourseRequest) =>
  api.delete(`online-courses/${courseId}`);

interface PostOnlineCourseRequest {
  data: PostOnlineCourseDto;
}

export const postOnlineCourse = ({ data }: PostOnlineCourseRequest) =>
  api.post<OnlineCourseResponse>('online-courses', data);

export * from './online-course-enrollment';
// Imports
export * from './online-course-lesson';
export * from './online-course-material';
export * from './online-course-module';
export * from './progress';
