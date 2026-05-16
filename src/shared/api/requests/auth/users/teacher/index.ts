import { api } from '@/shared/api';

import { appendOptionalValue, toUserProfileFormData } from '../profile-form-data';

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

interface PostTeacherRequest {
  data: PostTeacherDto;
}

export const postTeacher = ({ data }: PostTeacherRequest) =>
  api.post<TeacherResponse>('teacher', toTeacherProfileFormData(data));

const toTeacherProfileFormData = (data: PostTeacherDto) => {
  const formData = toUserProfileFormData(data);

  appendOptionalValue(formData, 'position', data.position);

  return formData;
};
