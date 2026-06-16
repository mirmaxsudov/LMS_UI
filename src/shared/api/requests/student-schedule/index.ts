import { api } from '@/shared/api';

export interface GetStudentScheduleRequest {
  params: {
    from: string;
    to: string;
  };
}

export const getStudentSchedule = (request: GetStudentScheduleRequest) =>
  api.get<StudentScheduleResponse>('students/me/schedule', { params: request.params });
