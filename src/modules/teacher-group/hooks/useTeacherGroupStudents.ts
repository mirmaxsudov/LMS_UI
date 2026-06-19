import { useQuery } from '@tanstack/react-query';

import { getTeacherGroupStudentOverviewQueryOptions } from '../options';

export const useTeacherGroupStudents = (groupId: string | null) => {
  const studentsQuery = useQuery(getTeacherGroupStudentOverviewQueryOptions(groupId));

  const overview = studentsQuery.data?.data.data ?? null;

  return {
    overview,
    students: overview?.students ?? [],
    isLoading: studentsQuery.isLoading,
    isError: studentsQuery.isError
  };
};
