import type { UrlFilterValues } from '@/features/user/types';
import type { RoleFiltersParams } from '@/modules/role/options';
import type { AsyncFetchContext, FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { getPermissions } from '@/shared/api';
import { createAsyncComboboxFilter } from '@/shared/ui/filter/FilterToolbar';

type FilterConfig = FilterMap[keyof FilterMap];

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

export const rolesFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'search',
    placeholder: 'Search'
  },
  createAsyncComboboxFilter({
    variant: 'async-combobox',
    key: 'permission',
    searchKey: 'search',
    placeholder: 'Permission',
    queryOptions: {
      baseQueryKey: ['permissions', 'role-filter'],
      queryFn: ({ pageParam, debouncedSearch }: AsyncFetchContext) =>
        getPermissions({
          params: {
            page: pageParam,
            search: debouncedSearch || undefined,
            size: 10
          }
        }),
      getNextPageParam: (
        lastPage: Awaited<ReturnType<typeof getPermissions>>,
        allPages: Awaited<ReturnType<typeof getPermissions>>[]
      ) =>
        lastPage.data.hasNext ? allPages.length + 1 : undefined
    },
    renderLabel: (permission: Permission) => permission.code,
    renderValue: (permission: Permission) => permission.id
  })
];

export const mapRolesFiltersToParams = (values: UrlFilterValues): RoleFiltersParams => ({
  permissionId: asString(values['permission-value']),
  search: asString(values.search)
});
