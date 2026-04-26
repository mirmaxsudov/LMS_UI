import type { GetGroupRequest } from '@/shared/api';
import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { groupActiveOptions, groupStatusOptions } from '@/modules/group/constants';

type FilterConfig = FilterMap[keyof FilterMap];

export type GroupFilterValues = Record<string, string | undefined>;

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

const asNumber = (value?: string) => {
  const val = asString(value);
  if (!val) return undefined;

  const parsed = Number(val);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const asBoolean = (value?: string) => {
  if (value === 'true') return true;
  if (value === 'false') return false;

  return undefined;
};

export const groupsFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'search',
    placeholder: 'Search'
  },
  {
    variant: 'select',
    key: 'status',
    placeholder: 'Status',
    options: groupStatusOptions
  },
  {
    variant: 'select',
    key: 'active',
    placeholder: 'Activity',
    options: groupActiveOptions
  },
  {
    variant: 'search',
    key: 'minCapacity',
    placeholder: 'Min capacity'
  },
  {
    variant: 'search',
    key: 'maxCapacity',
    placeholder: 'Max capacity'
  }
];

export const mapGroupsFiltersToParams = (
  values: GroupFilterValues
): GetGroupRequest['params'] => ({
  search: asString(values.search),
  status: asString(values.status) as GroupStatus | undefined,
  active: asBoolean(values.active),
  minCapacity: asNumber(values.minCapacity),
  maxCapacity: asNumber(values.maxCapacity)
});
