import { SearchIcon, SearchXIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';

import { CatalogCourseCard } from './CatalogCourseCard';
import { catalogCategories, catalogCourses } from './mock-data';

const levelOptions: { label: string; value: 'all' | CourseLevel }[] = [
  { label: 'All levels', value: 'all' },
  { label: 'Beginner', value: 'BEGINNER' },
  { label: 'Intermediate', value: 'INTERMEDIATE' },
  { label: 'Advanced', value: 'ADVANCED' }
];

export const CourseCatalogBrowser = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState<'all' | CourseLevel>('all');

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return catalogCourses.filter((course) => {
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.teacher.name.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query);
      const matchesCategory = category === 'All' || course.category === category;
      const matchesLevel = level === 'all' || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setLevel('all');
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <div className='relative flex-1'>
          <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            className='pl-9'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search courses, teachers or topics...'
          />
        </div>
        <Select value={level} onValueChange={(value) => setLevel(value as 'all' | CourseLevel)}>
          <SelectTrigger className='sm:w-48'>
            <SelectValue placeholder='Level' />
          </SelectTrigger>
          <SelectContent>
            {levelOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-wrap gap-2'>
        {catalogCategories.map((item) => (
          <button
            key={item}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              category === item
                ? 'border-primary bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            )}
            type='button'
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className='text-muted-foreground text-sm'>
        {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
      </p>

      {filteredCourses.length > 0 ? (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredCourses.map((course) => (
            <CatalogCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center'>
          <div className='bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full'>
            <SearchXIcon className='size-6' />
          </div>
          <div className='space-y-1'>
            <p className='font-medium'>No courses match your filters</p>
            <p className='text-muted-foreground text-sm'>
              Try adjusting your search or clearing the filters.
            </p>
          </div>
          <Button variant='outline' onClick={resetFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};
