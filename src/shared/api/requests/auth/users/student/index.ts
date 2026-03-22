import { api } from '@/shared/api';

export interface GetStudentsRequest {
  params?: Partial<{
    grade: string;
    name: string;
    status: StudentStatus;
  }> &
    PaginationRequest;
}

export const getStudents = (request?: GetStudentsRequest) =>
  api.get<StudentsResponse>('student', { params: request?.params });
