import type { FilterConfig, ParentFiltersParams, UrlFilterValues } from '@/features/user';

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

export const parentsFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'name',
    placeholder: 'Name'
  },
  {
    variant: 'search',
    key: 'childName',
    placeholder: 'Child name'
  }
];

export const mapParentsFiltersToParams = (values: UrlFilterValues): ParentFiltersParams => ({
  name: asString(values.name),
  childName: asString(values.childName)
});
