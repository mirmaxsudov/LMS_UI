import { msg } from '@lingui/core/macro';

import type { FilterConfig, TeacherFiltersParams, UrlFilterValues } from '@/features/user/types';

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

export const teachersFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'name',
    placeholder: 'Name'
  },
  {
    variant: 'search',
    key: 'phone',
    placeholder: 'Phone'
  },
  {
    variant: 'select',
    key: 'subject',
    placeholder: 'Subject',
    options: [
      { label: msg`Mathematics`, value: 'MATH' },
      { label: msg`Physics`, value: 'PHYSICS' },
      { label: msg`Literature`, value: 'LITERATURE' }
    ]
  }
];

export const mapTeachersFiltersToParams = (values: UrlFilterValues): TeacherFiltersParams => ({
  name: asString(values.name),
  phone: asString(values.phone),
  subject: asString(values.subject)
});
