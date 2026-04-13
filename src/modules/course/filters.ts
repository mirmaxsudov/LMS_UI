import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { courseLevelOptions } from '@/modules/course/constants';
import type { GetAllCoursesRequest } from '@/shared/api';

type FilterConfig = FilterMap[keyof FilterMap];

export type CourseFilterValues = Record<string, string | undefined>;

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

const asNumber = (value?: string) => {
  const val = asString(value);
  if (!val) return undefined;
  const parsed = Number(val);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const coursesFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'search',
    placeholder: 'Search'
  },
  {
    variant: 'select',
    key: 'level',
    placeholder: 'Level',
    options: courseLevelOptions
  },
  {
    variant: 'search',
    key: 'minDuration',
    placeholder: 'Min duration'
  },
  {
    variant: 'search',
    key: 'maxDuration',
    placeholder: 'Max duration'
  }
];

export const mapCoursesFiltersToParams = (
  values: CourseFilterValues
): GetAllCoursesRequest['params'] => ({
  search: asString(values.search),
  level: asString(values.level) as CourseLevel | undefined,
  minDuration: asNumber(values.minDuration),
  maxDuration: asNumber(values.maxDuration)
});
