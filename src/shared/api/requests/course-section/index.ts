import { api } from '@/shared/api';

export interface GetCourseSectionByIdRequest {
  id: string;
}

export const getCourseSectionById = ({ id }: GetCourseSectionByIdRequest) =>
  api.get<CourseSectionResponse>(`course-sections/${id}`);

interface PutCourseSectionRequest {
  data: PutCourseSectionDto;
  id: string;
}

export const putCourseSection = ({ id, data }: PutCourseSectionRequest) =>
  api.put<CourseSectionResponse>(`course-sections/${id}`, data);

interface DeleteCourseSectionRequest {
  id: string;
}

export const deleteCourseSection = ({ id }: DeleteCourseSectionRequest) =>
  api.delete(`course-sections/${id}`);

export interface GetCourseSectionsRequest {
  params?: Partial<{
    search: string;
    courseId: string;
    orderIndex: number;
  }> &
    PaginationRequest;
}

export const getCourseSections = (request?: GetCourseSectionsRequest) =>
  api.get<CourseSectionsResponse>('course-sections', {
    params: request?.params
  });

interface PostCourseSectionRequest {
  data: PostCourseSectionDto;
}

export const postCourseSection = ({ data }: PostCourseSectionRequest) =>
  api.post<CourseSectionResponse>('course-sections', data);
