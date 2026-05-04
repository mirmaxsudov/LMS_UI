import type { UrlFilterValues } from '@/features/user/types';
import type { CourseSectionFiltersParams } from '@/modules/course-section/options';
import type { AsyncFetchContext, FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { getAllCourses } from '@/shared/api';
import { createAsyncComboboxFilter } from '@/shared/ui/filter/FilterToolbar';

type FilterConfig = FilterMap[keyof FilterMap];

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

const asNumber = (value?: string) => {
  const val = asString(value);
  if (!val) return undefined;

  const parsed = Number(val);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const courseSectionsFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'search',
    placeholder: 'Search'
  },
  createAsyncComboboxFilter({
    variant: 'async-combobox',
    key: 'course',
    searchKey: 'search',
    placeholder: 'Course',
    queryOptions: {
      baseQueryKey: ['courses', 'course-section-filter'],
      queryFn: ({ pageParam, debouncedSearch }: AsyncFetchContext) =>
        getAllCourses({
          params: {
            page: pageParam,
            search: debouncedSearch || undefined,
            size: 10
          }
        }),
      getNextPageParam: (
        lastPage: Awaited<ReturnType<typeof getAllCourses>>,
        allPages: Awaited<ReturnType<typeof getAllCourses>>[]
      ) =>
        lastPage.data.hasNext ? allPages.length + 1 : undefined
    },
    renderLabel: (course: Course) => course.title,
    renderValue: (course: Course) => course.id
  }),
  {
    variant: 'search',
    key: 'orderIndex',
    placeholder: 'Order index'
  }
];

export const mapCourseSectionsFiltersToParams = (
  values: UrlFilterValues
): CourseSectionFiltersParams => ({
  courseId: asString(values['course-value']),
  orderIndex: asNumber(values.orderIndex),
  search: asString(values.search)
});
