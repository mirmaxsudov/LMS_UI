import { api } from '@/shared/api';

interface PutOnlineCourseMaterialRequest {
  data: PutOnlineCourseMaterialDto;
  materialId: string;
}

export const putOnlineCourseMaterial = ({ data, materialId }: PutOnlineCourseMaterialRequest) =>
  api.put<OnlineCourseMaterialResponse>(`online-courses/materials/${materialId}`, data);

interface DeleteOnlineCourseMaterialRequest {
  materialId: string;
}

export const deleteOnlineCourseMaterial = ({ materialId }: DeleteOnlineCourseMaterialRequest) =>
  api.delete(`online-courses/materials/${materialId}`);

interface PostOnlineCourseMaterialRequest {
  data: PostOnlineCourseMaterialDto;
  lessonId: string;
}

export const postOnlineCourseMaterial = ({ data, lessonId }: PostOnlineCourseMaterialRequest) =>
  api.post<OnlineCourseMaterialResponse>(`online-courses/lessons/${lessonId}/materials`, data);
