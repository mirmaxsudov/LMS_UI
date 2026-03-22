import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

export type UserEntityType = 'parents' | 'students' | 'teachers';

export type FilterConfig = FilterMap[keyof FilterMap];

export type UrlFilterValues = Record<string, string | undefined>;

export interface InfiniteQueryFactoryParams<TFilters extends object> {
  filters?: Partial<TFilters>;
  pageSize?: number;
}

export interface TeacherFiltersParams {
  name?: string;
  phone?: string;
  subject?: string;
}

export interface StudentFiltersParams {
  grade?: string;
  name?: string;
  status?: StudentStatus;
}

export interface ParentFiltersParams {
  childName?: string;
  name?: string;
}
