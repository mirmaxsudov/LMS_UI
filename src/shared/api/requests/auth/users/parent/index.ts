import { api } from '@/shared/api';

import { appendOptionalValue, toUserProfileFormData } from '../profile-form-data';

export interface GetParentRequest {
  params?: Partial<{
    childName: string;
    name: string;
  }> &
    PaginationRequest;
}

export const getParents = (request?: GetParentRequest) =>
  api.get<ParentsResponse>('parent', { params: request?.params });

interface PostParentRequest {
  data: PostParentDto;
}

export const postParent = ({ data }: PostParentRequest) =>
  api.post<ParentResponse>('parent', toParentProfileFormData(data));

const toParentProfileFormData = (data: PostParentDto) => {
  const formData = toUserProfileFormData(data);

  data.studentIds?.forEach((studentId, index) => {
    appendOptionalValue(formData, `studentIds[${index}]`, studentId);
  });

  return formData;
};
