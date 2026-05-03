import { api } from '@/shared/api';

export interface GetAttendanceNoteById {
  id: string;
}

export const getAttendanceNoteById = ({ id }: GetAttendanceNoteById) =>
  api.get<AttendanceNoteResponse>(`attendance-notes/${id}`);

interface PutAttendanceNoteRequest {
  data: PutAttendanceNoteDto;
  id: string;
}

export const putAttendanceNote = ({ id, data }: PutAttendanceNoteRequest) =>
  api.put<AttendanceNoteResponse>(`attendance-notes/${id}`, data);

interface DeleteAttendanceNoteRequest {
  id: string;
}

export const deleteAttendanceNote = ({ id }: DeleteAttendanceNoteRequest) =>
  api.delete(`attendance-notes/${id}`);

interface PostAttendanceNoteRequest {
  data: PostAttendanceNoteDto;
}

export const postAttendanceNote = ({ data }: PostAttendanceNoteRequest) =>
  api.post<AttendanceNoteResponse>('attendance-notes', data);

export interface GetAttendanceNotesRequest {
  params?: Partial<{
    attendanceId: string;
    studentId: string;
    lessonSessionId: string;
    groupId: string;
    lessonId: string;
  }> &
    PaginationRequest;
}

export const getAttendanceNotes = (request?: GetAttendanceNotesRequest) =>
  api.get<AttendanceNotesResponse>('attendance-notes', {
    params: request?.params
  });
