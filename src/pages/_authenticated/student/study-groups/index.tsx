import { useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  getStudyGroupsQueryOptions,
  StudyGroupCard,
  StudyGroupsOverview
} from '@/modules/study-group';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/input-group';
import { PageHeader, PageLoading } from '@/shared/ui/page';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

const getTeacherName = (teacher: StudyGroupTeacher) =>
  [teacher.firstName, teacher.middleName, teacher.lastName].filter(Boolean).join(' ');

const StudentStudyGroupsRoutePage = () => {
  const [search, setSearch] = useState<string>('');
  const [subject, setSubject] = useState<string>('all');

  const { t } = useLingui();

  const studyGroupsQuery = useQuery(getStudyGroupsQueryOptions({ size: 100 }));
  const studyGroups = studyGroupsQuery.data?.data.results ?? [];

  const subjects = useMemo(
    () => [...new Set(studyGroups.map((group) => group.course.title))],
    [studyGroups]
  );

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    return studyGroups.filter((group) => {
      const matchesSubject = subject === 'all' || group.course.title === subject;
      const matchesSearch =
        query === '' ||
        group.groupName.toLowerCase().includes(query) ||
        getTeacherName(group.teacher).toLowerCase().includes(query);

      return matchesSubject && matchesSearch;
    });
  }, [studyGroups, search, subject]);

  return (
    <>
      <PageHeader />
      <div className='flex flex-col gap-6 p-6'>
        <div>
          <h1 className='text-2xl font-semibold'>Study groups</h1>
          <p className='text-muted-foreground text-sm'>
            All the groups you&#39;re enrolled in, with schedules, classmates, and progress
          </p>
        </div>

        <StudyGroupsOverview groups={studyGroups} />

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <InputGroup className='sm:max-w-xs'>
            <InputGroupInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search by group or teacher'
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className='w-full sm:w-48'>
              <SelectValue placeholder={t`All subjects`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>{t`All subjects`}</SelectItem>
              {subjects.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredGroups.length > 0 ? (
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {filteredGroups.map((group) => (
              <StudyGroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className='text-muted-foreground rounded-lg border py-12 text-center text-sm'>
            No study groups match your search.
          </div>
        )}
      </div>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/student/study-groups/')({
  component: StudentStudyGroupsRoutePage,
  // loader: ({ context: { queryClient } }) =>
  //   queryClient.ensureQueryData(getStudyGroupOverviewQueryOptions()),
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
