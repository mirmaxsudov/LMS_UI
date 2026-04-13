import { api } from '@/shared/api';

export interface GetAllCoursesRequest {
  params: Partial<{
    search: string;
    level: CourseLevel;
    minDuration: number;
    maxDuration: number;
  }> &
    PaginationRequest;
}

export const getAllCourses = (request?: GetAllCoursesRequest) =>
  api.get<CoursesResponse>('courses', {
    params: request?.params
  });

export interface GetCourseByIdRequest {
  id: string;
}

export const getCourseById = ({ id }: GetCourseByIdRequest) => api.get<Course>(`course/${id}`);

interface PutCourseRequest {
  data: CourseRequest;
  id: string;
}

export const putCourse = ({ id, data }: PutCourseRequest) => api.put<Course>(`courses/${id}`, data);

interface DeleteCourseRequest {
  id: string;
}

export const deleteCourse = ({ id }: DeleteCourseRequest) => api.delete(`courses/${id}`);

interface PostCourseRequest {
  data: CourseRequest;
}

export const postCourse = ({ data }: PostCourseRequest) => api.post('courses', data);
