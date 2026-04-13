import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

export type UserEntityType = 'all' | 'parents' | 'students' | 'teachers';

export type FilterConfig = FilterMap[keyof FilterMap];

export type UrlFilterValues = Record<string, string | undefined>;

export interface QueryFactoryParams<TFilters extends object> {
  filters?: Partial<TFilters>;
  page?: number;
  size?: number;
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

export interface UserPreviewFiltersParams {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  permission?: string;
}
