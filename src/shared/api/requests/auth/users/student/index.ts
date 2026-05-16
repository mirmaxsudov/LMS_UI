import { api } from '@/shared/api';

import { appendOptionalValue, toUserProfileFormData } from '../profile-form-data';

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

interface PostStudentRequest {
  data: PostStudentDto;
}

export const postStudent = ({ data }: PostStudentRequest) =>
  api.post<StudentResponse>('student', toStudentProfileFormData(data));

const toStudentProfileFormData = (data: PostStudentDto) => {
  const formData = toUserProfileFormData(data);

  appendOptionalValue(formData, 'studentStatus', data.studentStatus);

  return formData;
};
