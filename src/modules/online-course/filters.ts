import type { UrlFilterValues } from '@/features/user/types';
import type { OnlineCourseFiltersParams } from '@/modules/online-course/options';
import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { courseLevelOptions } from '@/modules/course';
import { onlineCourseStatusOptions } from '@/modules/online-course/constants';

type FilterConfig = FilterMap[keyof FilterMap];

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

const asNumber = (value?: string) => {
  const val = asString(value);
  if (!val) return undefined;

  const parsed = Number(val);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const onlineCoursesFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'search',
    placeholder: 'Search'
  },
  {
    variant: 'select',
    key: 'status',
    placeholder: 'Status',
    options: onlineCourseStatusOptions
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

export const mapOnlineCoursesFiltersToParams = (
  values: UrlFilterValues
): OnlineCourseFiltersParams => ({
  level: asString(values.level) as CourseLevel | undefined,
  maxDuration: asNumber(values.maxDuration),
  minDuration: asNumber(values.minDuration),
  search: asString(values.search),
  status: asString(values.status) as OnlineCourseStatus | undefined
});
