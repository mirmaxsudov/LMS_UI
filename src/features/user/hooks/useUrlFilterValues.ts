import { parseAsString, useQueryStates } from 'nuqs';
import { useMemo } from 'react';

import type { FilterConfig, UrlFilterValues } from '@/features/user/types';

const getFilterKeys = (filtersConfig: FilterConfig[]) =>
  filtersConfig.flatMap((filter) => {
    if (filter.variant === 'date-range') return [filter.start_key, filter.end_key];
    if (filter.variant === 'async-combobox') return [`${filter.key}-value`, `${filter.key}-label`];
    return [filter.key];
  });

export const useUrlFilterValues = (filtersConfig: FilterConfig[]): UrlFilterValues => {
  const queryConfig = useMemo(() => {
    const keys = Array.from(new Set(getFilterKeys(filtersConfig)));
    return Object.fromEntries(keys.map((key) => [key, parseAsString.withDefault('')]));
  }, [filtersConfig]);

  const [values] = useQueryStates(queryConfig);

  return useMemo(
    () =>
      Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value === '' ? undefined : value])
      ),
    [values]
  );
};

