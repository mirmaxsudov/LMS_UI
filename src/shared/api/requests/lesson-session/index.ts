import { api } from '@/shared/api';

export interface GetLessonSessionByIdRequest {
  id: string;
}

export const getLessonSessionById = ({ id }: GetLessonSessionByIdRequest) =>
  api.get<LessonSessionResponse>(`lesson-sessions/${id}`);

interface PutLessonSessionRequest {
  data: PutLessonSessionDto;
  id: string;
}

export const putLessonSession = ({ id, data }: PutLessonSessionRequest) =>
  api.put<LessonSessionResponse>(`lesson-sessions/${id}`, data);

interface DeleteLessonSessionRequest {
  id: string;
}

export const deleteLessonSession = ({ id }: DeleteLessonSessionRequest) =>
  api.delete(`lesson-sessions/${id}`);

export interface GetLessonSessionsRequest {
  params?: Partial<{
    status: LessonSessionStatus;
    groupId: string;
    lessonId: string;
    from: string;
    to: string;
  }> &
    PaginationRequest;
}

export const getLessonSessions = (request?: GetLessonSessionsRequest) =>
  api.get<LessonSessionsResponse>('lesson-sessions', {
    params: request?.params
  });

interface PostLessonSessionRequest {
  data: PostLessonSessionDto;
}

export const postLessonSession = ({ data }: PostLessonSessionRequest) =>
  api.post<LessonSessionResponse>('lesson-sessions', data);
