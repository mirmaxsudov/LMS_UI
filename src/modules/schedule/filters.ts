import type { UrlFilterValues } from '@/features/user/types';
import type { ScheduleFiltersParams } from '@/modules/schedule/options';
import type { AsyncFetchContext, FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { dayOfWeekOptions } from '@/modules/group';
import { getGroups } from '@/shared/api';
import { createAsyncComboboxFilter } from '@/shared/ui/filter/FilterToolbar';

type FilterConfig = FilterMap[keyof FilterMap];

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

export const schedulesFiltersConfig: FilterConfig[] = [
  createAsyncComboboxFilter({
    variant: 'async-combobox',
    key: 'group',
    searchKey: 'search',
    placeholder: 'Group',
    queryOptions: {
      baseQueryKey: ['groups', 'schedule-filter'],
      queryFn: ({ pageParam, debouncedSearch }: AsyncFetchContext) =>
        getGroups({
          params: {
            page: pageParam,
            search: debouncedSearch || undefined,
            size: 10
          }
        }),
      getNextPageParam: (
        lastPage: Awaited<ReturnType<typeof getGroups>>,
        allPages: Awaited<ReturnType<typeof getGroups>>[]
      ) => (lastPage.data.hasNext ? allPages.length + 1 : undefined)
    },
    renderLabel: (group: Group) => group.name,
    renderValue: (group: Group) => group.id
  }),
  {
    variant: 'select',
    key: 'dayOfWeek',
    placeholder: 'Day of week',
    options: dayOfWeekOptions
  }
];

export const mapSchedulesFiltersToParams = (values: UrlFilterValues): ScheduleFiltersParams => ({
  dayOfWeek: asString(values.dayOfWeek) as DayOfWeek | undefined,
  groupId: asString(values['group-value'])
});
