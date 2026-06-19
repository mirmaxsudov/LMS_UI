import { useMemo, useState } from 'react';

import { getRoomName } from '../lib/format';
import { useTeacherGroups } from './useTeacherGroups';

type StatusFilter = 'ALL' | GroupStatus;

const matchesSearch = (group: TeacherGroup, query: string) => {
  if (!query) return true;

  const haystack = [group.groupName, group.course.title, getRoomName(group)]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
};

export const useTeacherGroupsPage = () => {
  const { groups, overview, isLoading } = useTeacherGroups();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('ALL');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    return groups.filter(
      (group) =>
        matchesSearch(group, query) && (status === 'ALL' || group.status === status)
    );
  }, [groups, search, status]);

  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === selectedGroupId) ?? null,
    [groups, selectedGroupId]
  );

  const openGroup = (group: TeacherGroup) => setSelectedGroupId(group.id);

  const onSheetOpenChange = (open: boolean) => {
    if (!open) setSelectedGroupId(null);
  };

  return {
    isLoading,
    overview,
    filteredGroups,
    search,
    setSearch,
    status,
    setStatus,
    selectedGroup,
    isSheetOpen: selectedGroup !== null,
    openGroup,
    onSheetOpenChange
  };
};
