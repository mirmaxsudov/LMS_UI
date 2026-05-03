import { api } from '@/shared/api';

interface GetAttendanceByIdRequest {
  id: string;
}

export const getAttendanceById = ({ id }: GetAttendanceByIdRequest) =>
  api.get<AttendanceResponse>(`attendances/${id}`);

interface PutAttendanceRequest {
  data: PutAttendanceDto;
  id: string;
}

export const putAttendance = ({ id, data }: PutAttendanceRequest) =>
  api.put<AttendanceResponse>(`attendances/${id}`, data);

interface DeleteAttendanceRequest {
  id: string;
}

export const deleteAttendance = ({ id }: DeleteAttendanceRequest) =>
  api.delete<AttendanceResponse>(`attendances/${id}`);

export interface GetAttendancesRequest {
  params?: Partial<{
    studentId: string;
    lessonSessionId: string;
    groupId: string;
    lessonId: string;
    status: AttendanceStatus;
    from: string;
    to: string;
  }> &
    PaginationRequest;
}

export const getAttendances = (request?: GetAttendancesRequest) =>
  api.get<AttendancesResponse>('attendances', { params: request?.params });

interface PostAttendanceRequest {
  data: PostAttendanceDto;
}

export const postAttendance = ({ data }: PostAttendanceRequest) =>
  api.post<AttendanceResponse>(`attendances`, data);
