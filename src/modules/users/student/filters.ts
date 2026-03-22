import type { FilterConfig, StudentFiltersParams, UrlFilterValues } from '@/features/user/types';

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

export const studentsFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'name',
    placeholder: 'Name'
  },
  {
    variant: 'search',
    key: 'grade',
    placeholder: 'Grade'
  },
  {
    variant: 'select',
    key: 'status',
    placeholder: 'Status',
    options: [
      { label: 'Active', value: 'ACTIVE' },
      { label: 'Graduated', value: 'GRADUATED' },
      { label: 'Suspended', value: 'SUSPENDED' }
    ]
  }
];

export const mapStudentsFiltersToParams = (values: UrlFilterValues): StudentFiltersParams => ({
  name: asString(values.name),
  grade: asString(values.grade),
  status: asString(values.status) as StudentStatus | undefined
});
