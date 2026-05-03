import type { UrlFilterValues } from '@/features/user/types';
import type { LessonFiltersParams } from '@/modules/lesson/options';
import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

type FilterConfig = FilterMap[keyof FilterMap];

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

const asNumber = (value?: string) => {
  const val = asString(value);
  if (!val) return undefined;
  const parsed = Number(val);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const lessonsFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'search',
    placeholder: 'Search'
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

export const mapLessonsFiltersToParams = (values: UrlFilterValues): LessonFiltersParams => ({
  maxDuration: asNumber(values.maxDuration),
  minDuration: asNumber(values.minDuration),
  search: asString(values.search)
});
