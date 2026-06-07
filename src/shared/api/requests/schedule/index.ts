import { api } from '@/shared/api';

export interface GetScheduleByIdRequest {
  id: string;
}

export const getScheduleById = ({ id }: GetScheduleByIdRequest) =>
  api.get<ScheduleResponse>(`schedules/${id}`);

interface PutScheduleRequest {
  data: PutScheduleDto;
  id: string;
}

export const putSchedule = ({ id, data }: PutScheduleRequest) =>
  api.put<ScheduleResponse>(`schedules/${id}`, data);

interface DeleteScheduleRequest {
  id: string;
}

export const deleteSchedule = ({ id }: DeleteScheduleRequest) => api.delete(`schedules/${id}`);

export interface GetSchedulesRequest {
  params?: Partial<{
    groupId: string;
    dayOfWeek: DayOfWeek;
  }> &
    PaginationRequest;
}

export const getSchedules = (request?: GetSchedulesRequest) =>
  api.get<SchedulesResponse>('schedules', {
    params: request?.params
  });

interface PostScheduleRequest {
  data: PostScheduleDto;
}

export const postSchedule = ({ data }: PostScheduleRequest) =>
  api.post<ScheduleResponse>('schedules', data);
