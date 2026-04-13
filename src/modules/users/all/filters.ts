import { useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';

import type { FilterConfig, UrlFilterValues, UserPreviewFiltersParams } from '@/features/user';
import type { Option } from '@/shared/ui/filter/FilterToolbar';

import { roleLabelMap, statusLabelMap } from '@/modules/users';

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

export const useAllUsersFiltersConfig = (): FilterConfig[] => {
  const { t } = useLingui();

  const roleOptions = useMemo<Option[]>(
    () =>
      Object.entries(roleLabelMap).map(([value, label]) => ({
        value,
        label: t(label)
      })),
    [t]
  );

  const statusOptions = useMemo<Option[]>(
    () =>
      Object.entries(statusLabelMap).map(([value, label]) => ({
        value,
        label: t(label)
      })),
    [t]
  );

  return useMemo(
    () => [
      {
        variant: 'search',
        key: 'search',
        placeholder: t`Search`
      },
      {
        variant: 'select',
        key: 'role',
        placeholder: t`Role`,
        options: roleOptions
      },
      {
        variant: 'select',
        key: 'status',
        placeholder: t`Status`,
        options: statusOptions
      }
    ],
    [t, roleOptions, statusOptions]
  );
};

export const mapAllUsersFiltersToParams = (values: UrlFilterValues): UserPreviewFiltersParams => ({
  search: asString(values.search),
  role: asString(values.role) as UserRole | undefined,
  status: asString(values.status) as UserStatus | undefined
});
