import { queryOptions } from '@tanstack/react-query';

import type { GetTeacherGroupsRequest } from '@/shared/api';

import { getTeacherGroups, getTeacherGroupStudentOverview } from '@/shared/api';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 100;

export type TeacherGroupsQueryParams = Partial<{
  courseId: string;
  page: number;
  search: string;
  size: number;
}>;

export const TEACHER_GROUP_QUERY_KEYS = {
  base: () => ['teacher-groups'] as const,
  allList: (request?: GetTeacherGroupsRequest) =>
    [...TEACHER_GROUP_QUERY_KEYS.base(), 'list', request] as const,
  studentOverview: (groupId: string) =>
    [...TEACHER_GROUP_QUERY_KEYS.base(), 'student-overview', groupId] as const
};

export const getTeacherGroupsQueryOptions = (params?: TeacherGroupsQueryParams) => {
  const requestParams = {
    courseId: params?.courseId,
    search: params?.search,
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_PAGE_SIZE
  };

  return queryOptions({
    queryKey: TEACHER_GROUP_QUERY_KEYS.allList({ params: requestParams }),
    queryFn: () => getTeacherGroups({ params: requestParams })
  });
};

export const getTeacherGroupStudentOverviewQueryOptions = (groupId: string | null) =>
  queryOptions({
    queryKey: TEACHER_GROUP_QUERY_KEYS.studentOverview(groupId ?? ''),
    queryFn: () => getTeacherGroupStudentOverview({ groupId: groupId! }),
    enabled: Boolean(groupId)
  });
