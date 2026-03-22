import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getStudentsInfiniteQueryOptions, UserListingTable, useUrlFilterValues } from '@/features';
import { mapStudentsFiltersToParams, studentColumns, studentsFiltersConfig } from '@/modules/users';
import { PageContent } from '@/shared/ui/page';

export const StudentsPage = () => {
  const filterValues = useUrlFilterValues(studentsFiltersConfig);
  const query = useInfiniteQuery(
    getStudentsInfiniteQueryOptions({
      filters: mapStudentsFiltersToParams(filterValues)
    })
  );

  const students = useMemo(
    () => query.data?.pages.flatMap((page) => page.data.results) ?? [],
    [query.data?.pages]
  );

  const total = query.data?.pages.at(-1)?.data.total ?? 0;

  return (
    <PageContent filtersConfig={studentsFiltersConfig}>
      <UserListingTable
        data={students}
        fetchNextPage={query.fetchNextPage}
        hasNextPage={Boolean(query.hasNextPage)}
        isFetchingNextPage={query.isFetchingNextPage}
        columns={studentColumns}
        isLoading={query.isLoading}
        total={total}
      />
    </PageContent>
  );
};
