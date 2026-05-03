import { api } from '@/shared/api';

export interface GetLessonByIdRequest {
  id: string;
}

export const getLessonById = ({ id }: GetLessonByIdRequest) =>
  api.get<LessonResponse>(`lessons/${id}`);

interface PutLessonRequest {
  data: PutLessonDto;
  id: string;
}

export const putLesson = ({ id, data }: PutLessonRequest) =>
  api.put<LessonResponse>(`lessons/${id}`, data);

interface DeleteLessonRequest {
  id: string;
}

export const deleteLesson = ({ id }: DeleteLessonRequest) => api.delete(`lessons/${id}`);

export interface GetLessonsRequest {
  params?: Partial<{
    search: string;
    sectionId: string;
    minDuration: number;
    maxDuration: number;
  }> &
    PaginationRequest;
}

export const getLessons = (request?: GetLessonsRequest) =>
  api.get<LessonsResponse>('lessons', {
    params: request?.params
  });

interface PostLessonRequest {
  data: PostLessonDto;
}

export const postLesson = ({ data }: PostLessonRequest) =>
  api.post<LessonResponse>('lessons', data);
