import type { ReactNode } from 'react';

import { useLingui } from '@lingui/react/macro';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { ComboboxOption } from '@/shared/ui/combobox';

import { getTeachersInfiniteQueryOptions } from '@/modules/users/teacher/options';
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

interface TeacherComboboxProps {
  children?: ReactNode;
  disabled?: boolean;
  emptyText?: string;
  pageSize?: number;
  placeholder?: string;
  value: ComboboxOption | null;
  onValueChange: (value: ComboboxOption | null) => void;
}

const getTeacherFullName = (teacher: Teacher) =>
  [teacher.user.firstName, teacher.user.middleName, teacher.user.lastName]
    .filter(Boolean)
    .join(' ');

export const TeacherCombobox = ({
  children,
  disabled,
  emptyText,
  pageSize,
  placeholder,
  value,
  onValueChange
}: TeacherComboboxProps) => {
  const { t } = useLingui();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);

  const teachersQuery = useInfiniteQuery({
    ...getTeachersInfiniteQueryOptions({
      filters: { name: debouncedSearch || undefined },
      size: pageSize
    }),
    enabled: open
  });

  const teachers = teachersQuery.data?.pages.flatMap((page) => page.data.results) ?? [];
  const options = teachers.map((teacher) => ({
    label: getTeacherFullName(teacher),
    value: teacher.teacherId
  }));

  const loadMore = async () => {
    if (teachersQuery.hasNextPage && !teachersQuery.isFetchingNextPage) {
      await teachersQuery.fetchNextPage();
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
      placeholder={placeholder ?? t`Select teacher`}
    >
      {trigger}
      <ComboboxContent>
        <ComboboxInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t`Search...`}
        />
        <ComboboxEmpty>{emptyText ?? t`No teachers found.`}</ComboboxEmpty>
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
          <div ref={ref} />
          {(teachersQuery.isLoading || teachersQuery.isFetchingNextPage) && (
            <div className='flex items-center justify-center py-2'>
              <Spinner />
            </div>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
