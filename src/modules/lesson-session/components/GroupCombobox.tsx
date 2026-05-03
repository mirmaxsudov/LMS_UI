import { useLingui } from '@lingui/react/macro';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { ComboboxOption } from '@/shared/ui/combobox';

import { getGroups } from '@/shared/api';
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

interface GroupComboboxProps {
  disabled?: boolean;
  value: ComboboxOption | null;
  onValueChange: (value: ComboboxOption | null) => void;
}

export const GroupCombobox = ({ disabled, value, onValueChange }: GroupComboboxProps) => {
  const { t } = useLingui();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);

  const groupsQuery = useInfiniteQuery({
    queryKey: ['groups', 'combobox', debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      getGroups({
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

  const groups = groupsQuery.data?.pages.flatMap((page) => page.data.results) ?? [];
  const options = groups.map((group) => ({
    label: group.name,
    value: group.id
  }));

  const { ref } = useInView({
    threshold: 0,
    onChange: async (inView) => {
      if (inView && groupsQuery.hasNextPage && !groupsQuery.isFetchingNextPage) {
        await groupsQuery.fetchNextPage();
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
      placeholder={t`Select group`}
    >
      <ComboboxTrigger className='w-full' disabled={disabled} />
      <ComboboxContent>
        <ComboboxInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t`Search...`}
        />
        <ComboboxEmpty>{t`No groups found.`}</ComboboxEmpty>
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
          <div ref={ref} />
          {(groupsQuery.isLoading || groupsQuery.isFetchingNextPage) && (
            <div className='flex items-center justify-center py-2'>
              <Spinner />
            </div>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
