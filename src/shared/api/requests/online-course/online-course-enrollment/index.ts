import { api } from '@/shared/api';

export interface GetOnlineCourseEnrollmentsRequest {
  params?: Partial<{
    courseId: string;
    studentProfileId: string;
    status: OnlineCourseEnrollmentStatus;
  }> &
    PaginationRequest;
}

export const getOnlineCourseEnrollments = (request: GetOnlineCourseEnrollmentsRequest) =>
  api.get<OnlineCourseEnrollmentsResponse>('online-courses/enrollments', {
    params: request.params
  });

export interface GetOnlineCourseEnrollmentsByMeRequest {
  params?: Partial<{
    status: OnlineCourseEnrollmentStatus;
  }> &
    PaginationRequest;
}

export const getOnlineCourseEnrollmentsByMe = (request: GetOnlineCourseEnrollmentsByMeRequest) =>
  api.get<OnlineCourseEnrollmentsResponse>('online-courses/enrollments/me', {
    params: request.params
  });

interface PostOnlineCourseEnrollmentRequest {
  courseId: string;
  data: PostOnlineCourseEnrollmentDto;
}

export const postOnlineCourseEnrollment = ({ courseId, data }: PostOnlineCourseEnrollmentRequest) =>
  api.post<OnlineCourseProgressResponse>(`online-courses/${courseId}/enrollments`, data);

interface PostOnlineCourseEnrollmentByMeRequest {
  courseId: string;
}

export const postOnlineCourseEnrollmentByMe = ({
  courseId
}: PostOnlineCourseEnrollmentByMeRequest) =>
  api.post<OnlineCourseProgressResponse>(`online-courses/${courseId}/enrollments/me`);
