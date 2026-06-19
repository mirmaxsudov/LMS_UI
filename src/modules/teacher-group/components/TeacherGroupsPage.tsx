import { useLingui } from '@lingui/react/macro';
import { SearchIcon } from 'lucide-react';

import { groupStatusLabelMap, groupStatusOptions } from '@/modules/group';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

import { useTeacherGroupsPage } from '../hooks';
import { TeacherGroupCard } from './TeacherGroupCard';
import { TeacherGroupsOverview } from './TeacherGroupsOverview';
import { TeacherGroupStudentsSheet } from './TeacherGroupStudentsSheet';

export const TeacherGroupsPage = () => {
  const { t } = useLingui();
  const {
    overview,
    filteredGroups,
    search,
    setSearch,
    status,
    setStatus,
    selectedGroup,
    isSheetOpen,
    openGroup,
    onSheetOpenChange
  } = useTeacherGroupsPage();

  return (
    <div className='flex flex-col gap-6 p-6'>
      <div>
        <h1 className='text-2xl font-semibold'>My groups</h1>
        <p className='text-muted-foreground text-sm'>
          Groups you teach — open a group to see its students and detailed info.
        </p>
      </div>

      <TeacherGroupsOverview overview={overview} />

      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <InputGroup className='sm:max-w-xs'>
          <InputGroupInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search by group, course or room'
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
          <SelectTrigger className='w-full sm:w-48'>
            <SelectValue placeholder={t`All statuses`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ALL'>{t`All statuses`}</SelectItem>
            {groupStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(groupStatusLabelMap[option.value])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredGroups.length > 0 ? (
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {filteredGroups.map((group) => (
            <TeacherGroupCard key={group.id} group={group} onView={openGroup} />
          ))}
        </div>
      ) : (
        <div className='text-muted-foreground rounded-lg border py-12 text-center text-sm'>
          No groups match your search.
        </div>
      )}

      <TeacherGroupStudentsSheet
        group={selectedGroup}
        onOpenChange={onSheetOpenChange}
        open={isSheetOpen}
      />
    </div>
  );
};
