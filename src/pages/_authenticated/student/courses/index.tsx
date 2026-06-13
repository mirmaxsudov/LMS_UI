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

import type { CourseStatus } from './-components/types';

import { CourseCard } from './-components/CourseCard';
import { CoursesOverview } from './-components/CoursesOverview';
import { studentCourses } from './-components/mock-data';

const levels = [...new Set(studentCourses.map((course) => course.level))];

const statusOptions: { label: string; value: 'all' | CourseStatus }[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'In progress', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Upcoming', value: 'upcoming' }
];

const levelLabel: Record<CourseLevel, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced'
};

const StudentCoursesRoutePage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | CourseStatus>('all');
  const [level, setLevel] = useState<'all' | CourseLevel>('all');

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return studentCourses.filter((course) => {
      const matchesStatus = status === 'all' || course.status === status;
      const matchesLevel = level === 'all' || course.level === level;
      const matchesSearch =
        query === '' ||
        course.title.toLowerCase().includes(query) ||
        course.teacher.name.toLowerCase().includes(query);

      return matchesStatus && matchesLevel && matchesSearch;
    });
  }, [search, status, level]);

  return (
    <>
      <PageHeader />
      <div className='flex flex-col gap-6 p-6'>
        <div>
          <h1 className='text-2xl font-semibold'>My courses</h1>
          <p className='text-muted-foreground text-sm'>
            All the courses you&#39;re enrolled in, with schedules, teachers and progress
          </p>
        </div>

        <CoursesOverview />

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <InputGroup className='sm:max-w-xs'>
            <InputGroupInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search by course or teacher'
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <div className='flex gap-2'>
            <Select value={status} onValueChange={(value: 'all' | CourseStatus) => setStatus(value)}>
              <SelectTrigger className='w-full sm:w-44'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={level} onValueChange={(value: 'all' | CourseLevel) => setLevel(value)}>
              <SelectTrigger className='w-full sm:w-40'>
                <SelectValue placeholder='Level' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All levels</SelectItem>
                {levels.map((item) => (
                  <SelectItem key={item} value={item}>
                    {levelLabel[item]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className='text-muted-foreground rounded-lg border py-12 text-center text-sm'>
            No courses match your search.
          </div>
        )}
      </div>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/student/courses/')({
  component: StudentCoursesRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
