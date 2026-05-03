import { useLingui } from '@lingui/react/macro';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { ComboboxOption } from '@/shared/ui/combobox';

import { getLessons } from '@/shared/api';
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

interface LessonComboboxProps {
  disabled?: boolean;
  value: ComboboxOption | null;
  onValueChange: (value: ComboboxOption | null) => void;
}

export const LessonCombobox = ({ disabled, value, onValueChange }: LessonComboboxProps) => {
  const { t } = useLingui();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);

  const lessonsQuery = useInfiniteQuery({
    queryKey: ['lessons', 'combobox', debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      getLessons({
        params: {
          page: pageParam,
          search: debouncedSearch || undefined,
          size: 10
        }
      }),
    initialPageParam: 1,
    enabled: open,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.hasNext ? allPages.length + 1 : undefined
  });

  const lessons = lessonsQuery.data?.pages.flatMap((page) => page.data.results) ?? [];
  const options = lessons.map((lesson) => ({
    label: lesson.title,
    value: lesson.id
  }));

  const { ref } = useInView({
    threshold: 0,
    onChange: async (inView) => {
      if (inView && lessonsQuery.hasNextPage && !lessonsQuery.isFetchingNextPage) {
        await lessonsQuery.fetchNextPage();
      }
    }
  });

  return (
    <Combobox
      clearable
      data={options}
      value={value}
      onOpenChange={setOpen}
      onValueChange={onValueChange}
      open={open}
      placeholder={t`Select lesson`}
    >
      <ComboboxTrigger className='w-full' disabled={disabled} />
      <ComboboxContent>
        <ComboboxInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t`Search...`}
        />
        <ComboboxEmpty>{t`No lessons found.`}</ComboboxEmpty>
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
          <div ref={ref} />
          {(lessonsQuery.isLoading || lessonsQuery.isFetchingNextPage) && (
            <div className='flex items-center justify-center py-2'>
              <Spinner />
            </div>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
