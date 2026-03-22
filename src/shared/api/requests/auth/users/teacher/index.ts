import { api } from '@/shared/api';

export interface GetTeachersRequest {
  params?: Partial<{
    name: string;
    phone: string;
    position: TeacherPositon;
    subject: string;
  }> &
    PaginationRequest;
}

export const getTeachers = (request?: GetTeachersRequest) =>
  api.get<TeachersResponse>('teacher', { params: request?.params });
