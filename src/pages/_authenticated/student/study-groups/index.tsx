import { createFileRoute } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/input-group';
import { PageHeader, PageLoading } from '@/shared/ui/page';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';

import { studyGroups } from './-components/mock-data';
import { StudyGroupCard } from './-components/StudyGroupCard';
import { StudyGroupsOverview } from './-components/StudyGroupsOverview';

const subjects = [...new Set(studyGroups.map((group) => group.subject))];

const StudentStudyGroupsRoutePage = () => {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('all');

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    return studyGroups.filter((group) => {
      const matchesSubject = subject === 'all' || group.subject === subject;
      const matchesSearch =
        query === '' ||
        group.name.toLowerCase().includes(query) ||
        group.teacher.toLowerCase().includes(query);

      return matchesSubject && matchesSearch;
    });
  }, [search, subject]);

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

        <StudyGroupsOverview />

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
              <SelectValue placeholder='All subjects' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All subjects</SelectItem>
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
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
