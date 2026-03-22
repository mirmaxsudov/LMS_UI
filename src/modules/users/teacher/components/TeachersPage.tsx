import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getTeachersInfiniteQueryOptions, UserListingTable, useUrlFilterValues } from '@/features';
import { mapTeachersFiltersToParams, teacherColumns, teachersFiltersConfig } from '@/modules/users';
import { PageContent } from '@/shared/ui/page';

export const TeachersPage = () => {
  const filterValues = useUrlFilterValues(teachersFiltersConfig);
  const query = useInfiniteQuery(
    getTeachersInfiniteQueryOptions({
      filters: mapTeachersFiltersToParams(filterValues)
    })
  );

  const teachers = useMemo(
    () => query.data?.pages.flatMap((page) => page.data.results) ?? [],
    [query.data?.pages]
  );

  const total = query.data?.pages.at(-1)?.data.total ?? 0;

  return (
    <PageContent filtersConfig={teachersFiltersConfig}>
      <UserListingTable
        data={teachers}
        fetchNextPage={query.fetchNextPage}
        hasNextPage={Boolean(query.hasNextPage)}
        isFetchingNextPage={query.isFetchingNextPage}
        columns={teacherColumns}
        isLoading={query.isLoading}
        total={total}
      />
    </PageContent>
  );
};
