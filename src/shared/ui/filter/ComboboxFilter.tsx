import type { DefaultError, QueryKey } from '@tanstack/react-query';

import { useLingui } from '@lingui/react/macro';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CirclePlus } from 'lucide-react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import type { Button } from '@/shared/ui/button';
import type { ComboboxOption } from '@/shared/ui/combobox';

import { useDebouncedValue } from '@/shared/hooks/useDeboucedValue';
import { cn } from '@/shared/lib/utils';
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

import type {
  AsyncComboboxFilter,
  AsyncFetchFn,
  AsyncQueryOptions,
  DefaultAsyncComboboxItem,
  InfiniteDataFromQueryOptions,
  QueryFnReturn
} from '../filter/FilterToolbar';

interface ComboboxFilterProps<
  F extends AsyncFetchFn<any>,
  QO extends AsyncQueryOptions<F>,
  Item = DefaultAsyncComboboxItem<QO>
> {
  filter: AsyncComboboxFilter<F, QO, Item>;
  size?: React.ComponentProps<typeof Button>['size'];
  value: ComboboxOption | null;
  onValueChange: (value: ComboboxOption | null) => void;
}

export const ComboboxFilter = <
  F extends AsyncFetchFn<any>,
  QO extends AsyncQueryOptions<F>,
  Item = DefaultAsyncComboboxItem<QO>
>({
  value,
  onValueChange,
  size = 'sm',
  filter
}: ComboboxFilterProps<F, QO, Item>) => {
  const [search, setSearch] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { t } = useLingui();

  const { ref } = useInView({
    threshold: 0,
    onChange: async (inView) => {
      if (inView) await loadMore();
    }
  });

  const debouncedSearch = useDebouncedValue(search);

  const queryKey: QueryKey = [
    ...(filter.queryOptions.baseQueryKey ?? []),
    debouncedSearch,
    filter.searchKey
  ];

  const dataQuery = useInfiniteQuery<
    QueryFnReturn<QO['queryFn']>,
    DefaultError,
    InfiniteDataFromQueryOptions<QO>,
    QueryKey,
    number
  >({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      filter.queryOptions.queryFn({
        pageParam,
        debouncedSearch,
        searchKey: filter.searchKey
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (filter.queryOptions.getNextPageParam) {
        return filter.queryOptions.getNextPageParam(
          lastPage as QueryFnReturn<QO['queryFn']>,
          allPages as QueryFnReturn<QO['queryFn']>[]
        );
      }

      const anyLast = lastPage as any;
      return anyLast?.data?.next ? allPages.length + 1 : undefined;
    }
  });

  const data = (() => {
    if (!dataQuery.data) return [] as Item[];
    if (filter.castValues) return filter.castValues(dataQuery.data);
    const anyData = dataQuery.data as any;
    return (anyData?.pages ?? []).flatMap((page: any) => page?.data?.results ?? []) as Item[];
  })();

  const loadMore = async () => {
    if (dataQuery.hasNextPage) await dataQuery.fetchNextPage();
  };

  const handleSearchChange = (value: string) => setSearch(value);

  return (
    <Combobox
      data={data.map((d) => ({
        value: `${filter.renderValue(d)}`,
        label: `${filter.renderLabel(d)}`
      }))}
      value={value}
      onOpenChange={setOpen}
      onValueChange={onValueChange}
      open={open}
      placeholder={filter.placeholder || t`Select`}
    >
      <div className='hover:bg-accent/60 bg-accent/30 border-accent-foreground/15 flex items-center gap-0.5 rounded-md border border-solid ps-2 not-dark:bg-transparent'>
        <CirclePlus
          className={cn('size-4 cursor-pointer transition-all duration-500', [
            {
              'text-muted-foreground hover:text-foreground rotate-45 transform': !!value?.value
            }
          ])}
          onClick={() => {
            if (value) onValueChange(null);
            else setOpen(true);
          }}
        />
        <ComboboxTrigger
          className='text-foreground hover:text-foreground m-0 max-w-[200px] justify-start border-0 ps-2 font-semibold shadow-none'
          size={size}
        >
          <span className='truncate'>{value?.label || filter.placeholder || t`Select`}</span>
        </ComboboxTrigger>
      </div>
      <ComboboxContent
        className='min-w-[400px]'
        popoverOptions={{
          align: 'center'
        }}
      >
        <ComboboxInput
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={t`Search...`}
        />
        <ComboboxEmpty>{t`No results.`}</ComboboxEmpty>
        <ComboboxList>
          {data.map((item, index) => (
            <ComboboxItem
              key={`${filter.key}-${index}`}
              value={filter.renderValue(item).toString()}
            >
              {filter.renderItem ? filter.renderItem(item) : filter.renderLabel(item)}
            </ComboboxItem>
          ))}
          <div ref={ref} />
          {dataQuery.hasNextPage && dataQuery.isFetchingNextPage && (
            <div className='flex items-center justify-center'>
              <Spinner />
            </div>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
