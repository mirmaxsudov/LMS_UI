import type { GetPermissionsRequest } from '@/shared/api';
import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import {
  permissionCategoryOptions,
  permissionSystemOptions
} from '@/modules/permission/constants';

type FilterConfig = FilterMap[keyof FilterMap];

export type PermissionFilterValues = Record<string, string | undefined>;

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

const asBoolean = (value?: string) => {
  const val = asString(value);
  if (!val) return undefined;

  return val === 'true';
};

export const permissionsFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'search',
    placeholder: 'Search'
  },
  {
    variant: 'search',
    key: 'module',
    placeholder: 'Module'
  },
  {
    variant: 'search',
    key: 'action',
    placeholder: 'Action'
  },
  {
    variant: 'select',
    key: 'category',
    placeholder: 'Category',
    options: permissionCategoryOptions
  },
  {
    variant: 'select',
    key: 'isSystem',
    placeholder: 'Type',
    options: permissionSystemOptions
  }
];

export const mapPermissionsFiltersToParams = (
  values: PermissionFilterValues
): GetPermissionsRequest['params'] => ({
  action: asString(values.action),
  category: asString(values.category) as PermissionCategory | undefined,
  isSystem: asBoolean(values.isSystem),
  module: asString(values.module),
  search: asString(values.search)
});
