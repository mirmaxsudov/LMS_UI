import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getTeacherGroupsQueryOptions } from '../options';

export const useTeacherGroups = () => {
  const teacherGroupsQuery = useQuery(getTeacherGroupsQueryOptions());

  const groups = teacherGroupsQuery.data?.data.results ?? [];

  const overview = useMemo<TeacherGroupOverview>(() => {
    const totalGroups = groups.length;
    const totalStudents = groups.reduce((sum, group) => sum + group.currentStudents, 0);
    const activeGroups = groups.filter((group) => group.status === 'ACTIVE').length;
    const sessionsThisWeek = groups
      .filter((group) => group.status !== 'FINISHED')
      .reduce((sum, group) => sum + group.scheduleDays.length, 0);

    return { totalGroups, totalStudents, activeGroups, sessionsThisWeek };
  }, [groups]);

  return {
    groups,
    overview,
    isLoading: teacherGroupsQuery.isLoading,
    isError: teacherGroupsQuery.isError
  };
};
