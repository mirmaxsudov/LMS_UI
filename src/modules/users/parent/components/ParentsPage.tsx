import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getParentsInfiniteQueryOptions, UserListingTable, useUrlFilterValues } from '@/features';
import { mapParentsFiltersToParams, parentColumns, parentsFiltersConfig } from '@/modules/users';
import { PageContent } from '@/shared/ui/page';

export const ParentsPage = () => {
  const filterValues = useUrlFilterValues(parentsFiltersConfig);
  const query = useInfiniteQuery(
    getParentsInfiniteQueryOptions({
      filters: mapParentsFiltersToParams(filterValues)
    })
  );

  const parents = useMemo(
    () => query.data?.pages.flatMap((page) => page.data.results) ?? [],
    [query.data?.pages]
  );

  const total = query.data?.pages.at(-1)?.data.total ?? 0;

  return (
    <PageContent filtersConfig={parentsFiltersConfig}>
      <UserListingTable
        data={parents}
        fetchNextPage={query.fetchNextPage}
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        columns={parentColumns}
        isLoading={query.isLoading}
        total={total}
      />
    </PageContent>
  );
};
