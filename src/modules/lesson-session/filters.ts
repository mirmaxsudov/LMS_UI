import type { UrlFilterValues } from '@/features/user/types';
import type { LessonSessionFiltersParams } from '@/modules/lesson-session/options';
import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { lessonSessionStatusOptions } from '@/modules/lesson-session/constants';

type FilterConfig = FilterMap[keyof FilterMap];

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

export const lessonSessionsFiltersConfig: FilterConfig[] = [
  {
    variant: 'select',
    key: 'status',
    placeholder: 'Status',
    options: lessonSessionStatusOptions
  },
  {
    variant: 'date-range',
    start_key: 'from',
    end_key: 'to',
    placeholder: 'Date range'
  }
];

export const mapLessonSessionsFiltersToParams = (
  values: UrlFilterValues
): LessonSessionFiltersParams => ({
  from: asString(values.from),
  status: asString(values.status) as LessonSessionStatus | undefined,
  to: asString(values.to)
});
