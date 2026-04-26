import type { MessageDescriptor } from '@lingui/core';
import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import type { ComponentType, Dispatch, ReactNode, SetStateAction } from 'react';

import { useLingui } from '@lingui/react/macro';
import { parseAsString, useQueryStates } from 'nuqs';
import React from 'react';

import type { ComboboxOption } from '@/shared/ui/combobox';

import { Button } from '@/shared/ui/button';
import { ComboboxFilter } from '@/shared/ui/filter/ComboboxFilter';
import { DateFilterInput } from '@/shared/ui/filter/DateFilterInput';
import { DateRangeFilter } from '@/shared/ui/filter/DateRangeFilter';
import { SearchFilterInput } from '@/shared/ui/filter/SearchFilterInput';
import { SelectFilter } from '@/shared/ui/filter/SelectFilter';

type FilterVariant =
  | 'async-combobox'
  | 'date-range'
  | 'date'
  | 'multiple-select'
  | 'search'
  | 'select';

export interface Option {
  count?: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label: MessageDescriptor;
  value: number | string;
}

export interface CustomFilterRenderProps<Value = unknown> {
  filter: CustomFilter<Value>;
  value: Value;
  setValue: (next: Value) => void;
}

export interface CustomFilter<Value = unknown> {
  Component: ComponentType<CustomFilterRenderProps<Value>>;
  initialValue?: Value;
  key: string;
  variant: 'custom';
}

export interface AsyncFetchContext {
  debouncedSearch: string;
  pageParam: number;
  searchKey: string;
}

export type AsyncFetchFn<R> = (ctx: AsyncFetchContext) => Promise<R> | R;

export type QueryFnReturn<F extends AsyncFetchFn<any>> = Awaited<ReturnType<F>>;

export interface AsyncQueryOptions<F extends AsyncFetchFn<any>> {
  baseQueryKey: QueryKey;
  queryFn: F;
  getNextPageParam?: (
    lastPage: QueryFnReturn<F>,
    allPages: QueryFnReturn<F>[]
  ) => number | undefined;
}

export type InfiniteDataFromQueryOptions<QO extends AsyncQueryOptions<AsyncFetchFn<any>>> =
  InfiniteData<QueryFnReturn<QO['queryFn']>>;

export type DefaultAsyncComboboxItem<
  QO extends AsyncQueryOptions<AsyncFetchFn<any>> = AsyncQueryOptions<AsyncFetchFn<any>>
> = InfiniteDataFromQueryOptions<QO>['pages'][number] extends {
  data?: { results?: (infer Item)[] };
}
  ? Item
  : unknown;

export type CastValuesFn<QO extends AsyncQueryOptions<AsyncFetchFn<any>>, Item> = (
  data: InfiniteDataFromQueryOptions<QO>
) => Item[];

export interface AsyncComboboxFilter<
  F extends AsyncFetchFn<any> = AsyncFetchFn<any>,
  QO extends AsyncQueryOptions<F> = AsyncQueryOptions<F>,
  Item = DefaultAsyncComboboxItem<QO>
> {
  castValues?: CastValuesFn<QO, Item>;
  key: string;
  placeholder?: string;
  queryOptions: QO;
  searchKey: string;
  variant: 'async-combobox';
  renderItem?: (data: Item) => ReactNode;
  renderLabel: (data: Item) => number | string;
  renderValue: (data: Item) => number | string;
}

export const createAsyncComboboxFilter = <
  F extends AsyncFetchFn<any>,
  QO extends AsyncQueryOptions<F>,
  Item
>(
  config: AsyncComboboxFilter<F, QO, Item>
) => config;

export interface FilterMap {
  'async-combobox': AsyncComboboxFilter<any, any, any>;
  date: {
    variant: 'date';
    key: string;
    placeholder?: string;
    dateFormat?: string;
    className?: string;
  };
  'date-range': {
    start_key: string;
    end_key: string;
    variant: 'date-range';
    placeholder?: string;
    minDate?: string | Date;
    maxDate?: string | Date;
    dateFormat?: string;
    className?: string;
  };
  'multiple-select': {
    variant: 'multiple-select';
    key: string;
    placeholder?: string;
    options: Option[];
    className?: string;
  };
  search: {
    variant: 'search';
    key: string;
    placeholder?: string;
    debounceTime?: number;
    trim?: boolean;
    className?: string;
    icon?: React.ElementType;
  };
  select: {
    variant: 'select';
    key: string;
    placeholder?: string;
    options: Option[];
    className?: string;
  };
}

type Filter = FilterMap[FilterVariant];

export interface Props {
  className?: string;
  filters: Filter[];
  setValues?: Dispatch<
    SetStateAction<
      {
        key: string;
        value: string | null;
      }[]
    >
  >;
}

export const FilterToolbar = ({ filters, className, setValues }: Props) => {
  const { t } = useLingui();

  const queryConfig = Object.fromEntries(
    filters.flatMap((f) =>
      f.variant === 'date-range'
        ? [
            [f.start_key, parseAsString.withDefault('')],
            [f.end_key, parseAsString.withDefault('')]
          ]
        : f.variant === 'search'
          ? [
              [
                f.key,
                parseAsString
                  .withDefault('')
                  .withOptions({ limitUrlUpdates: { method: 'debounce', timeMs: 300 } })
              ]
            ]
          : f.variant === 'async-combobox'
            ? [
                [`${f.key}-value`, parseAsString.withDefault('')],
                [`${f.key}-label`, parseAsString.withDefault('')]
              ]
            : [[f.key, parseAsString.withDefault('')]]
    )
  );

  const [values, setQueryValues] = useQueryStates(queryConfig);

  const getFilter = (filter: Filter) => {
    if (!filter) return null;
    else if (filter.variant === 'search')
      return (
        <SearchFilterInput
          key={filter.key}
          setVal={async (value: string | null) => {
            if (setValues)
              setValues((prev) => [
                ...prev.filter((item) => item.key !== filter.key),
                {
                  key: filter.key,
                  value
                }
              ]);
            await setQueryValues({ [filter.key]: value });
          }}
          filter={filter}
          val={values[filter.key]}
        />
      );
    else if (filter.variant === 'date')
      return (
        <DateFilterInput
          key={filter.key}
          setVal={async (value: string | null) => {
            if (setValues)
              setValues((prev) => [
                ...prev.filter((item) => item.key !== filter.key),
                {
                  key: filter.key,
                  value
                }
              ]);
            await setQueryValues({ [filter.key]: value });
          }}
          filter={filter}
          val={values[filter.key]}
        />
      );
    else if (filter.variant === 'date-range')
      return (
        <DateRangeFilter
          key={`${filter.start_key}-${filter.end_key}`}
          setVal={async (value) => {
            if (setValues)
              setValues((prev) => [
                ...prev.filter(
                  (item) => item.key !== filter.start_key && item.key !== filter.end_key
                ),
                {
                  key: filter.start_key,
                  value: value?.start_date ?? null
                },
                {
                  key: filter.end_key,
                  value: value?.end_date ?? null
                }
              ]);
            await setQueryValues({
              [filter.start_key]: value?.start_date ?? null,
              [filter.end_key]: value?.end_date ?? null
            });
          }}
          value={{
            start_date: values[filter.start_key],
            end_date: values[filter.end_key]
          }}
          filter={filter}
        />
      );
    else if (filter.variant === 'select')
      return (
        <SelectFilter
          key={filter.key}
          setVal={async (value: string | null) => {
            if (setValues)
              setValues((prev) => [
                ...prev.filter((item) => item.key !== filter.key),
                {
                  key: filter.key,
                  value
                }
              ]);
            await setQueryValues({
              [filter.key]: value
            });
          }}
          filter={filter}
          multiple={false}
          val={values[filter.key]}
        />
      );
    else if (filter.variant === 'multiple-select')
      return (
        <SelectFilter
          key={filter.key}
          setVal={async (value: string | null) => {
            if (setValues)
              setValues((prev) => [
                ...prev.filter((item) => item.key !== filter.key),
                {
                  key: filter.key,
                  value
                }
              ]);
            await setQueryValues({
              [filter.key]: value
            });
          }}
          filter={filter}
          multiple={true}
          val={values[filter.key]}
        />
      );
    else if (filter.variant === 'async-combobox') {
      return (
        <ComboboxFilter
          value={{
            value: values[`${filter.key}-value`],
            label: values[`${filter.key}-label`]
          }}
          filter={filter}
          onValueChange={async (value: ComboboxOption | null) => {
            if (setValues)
              setValues((prev) => [
                ...prev.filter((item) => item.key !== filter.key),
                {
                  key: filter.key,
                  value: value?.value ?? null
                }
              ]);
            await setQueryValues({
              [`${filter.key}-value`]: value?.value ?? null,
              [`${filter.key}-label`]: value?.label ?? null
            });
          }}
        />
      );
    }
    return null;
  };

  const isDirty = (): boolean => {
    return Object.values(values).some((value) => value !== '');
  };

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      {filters.map((filter) => getFilter(filter))}
      {isDirty() && (
        <Button
          size='sm'
          variant='destructive'
          onClick={async () => {
            await setQueryValues(null);
          }}
        >
          {t`Clear`}
        </Button>
      )}
    </div>
  );
};
