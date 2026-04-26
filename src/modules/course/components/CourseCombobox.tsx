import type { ReactNode } from 'react';

import { useLingui } from '@lingui/react/macro';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { ComboboxOption } from '@/shared/ui/combobox';

import { getCoursesInfiniteQueryOptions } from '@/modules/course/options';
import { useDebouncedValue } from '@/shared/hooks/useDeboucedValue';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from '@/shared/ui/combobox';
import { Spinner } from '@/shared/ui/spinner';

interface CourseComboboxProps {
  children?: ReactNode;
  disabled?: boolean;
  emptyText?: string;
  pageSize?: number;
  placeholder?: string;
  value: ComboboxOption | null;
  onValueChange: (value: ComboboxOption | null) => void;
}

export const CourseCombobox = ({
  children,
  disabled,
  emptyText,
  pageSize,
  placeholder,
  value,
  onValueChange
}: CourseComboboxProps) => {
  const { t } = useLingui();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);

  const coursesQuery = useInfiniteQuery({
    ...getCoursesInfiniteQueryOptions({
      filters: { search: debouncedSearch || undefined },
      size: pageSize
    }),
    enabled: open
  });

  const courses = coursesQuery.data?.pages.flatMap((page) => page.data.results) ?? [];
  const options = courses.map((course) => ({
    label: course.title,
    value: course.id
  }));

  const loadMore = async () => {
    if (coursesQuery.hasNextPage && !coursesQuery.isFetchingNextPage) {
      await coursesQuery.fetchNextPage();
    }
  };

  const { ref } = useInView({
    threshold: 0,
    onChange: async (inView) => {
      if (inView) await loadMore();
    }
  });

  const trigger = children || <ComboboxTrigger className='w-full' disabled={disabled} />;

  return (
    <Combobox
      clearable
      data={options}
      value={value}
      onOpenChange={setOpen}
      onValueChange={onValueChange}
      open={open}
      placeholder={placeholder ?? t`Select course`}
    >
      {trigger}
      <ComboboxContent>
        <ComboboxInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t`Search...`}
        />
        <ComboboxEmpty>{emptyText ?? t`No courses found.`}</ComboboxEmpty>
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
          <div ref={ref} />
          {(coursesQuery.isLoading || coursesQuery.isFetchingNextPage) && (
            <div className='flex items-center justify-center py-2'>
              <Spinner />
            </div>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
