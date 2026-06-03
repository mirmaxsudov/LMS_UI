import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import React from 'react';

import { getGlobalSearchQueryOptions } from '@/modules/search';
import { useDebouncedValue } from '@/shared/hooks/useDeboucedValue.ts';
import { Input } from '@/shared/ui/input';
import { Spinner } from '@/shared/ui/spinner';

import { GLOBAL_SEARCH_MIN_LENGTH, GLOBAL_SEARCH_PAGE_SIZE } from './constants.ts';
import {
  globalSearchDropdownReducer,
  initialGlobalSearchDropdownState
} from './reducer.ts';
import { SearchDropdown } from './SearchDropdown.tsx';

export const GlobalSearch = () => {
  const { history } = useRouter();
  const searchRef = React.useRef<HTMLDivElement>(null);
  const [search, setSearch] = React.useState('');
  const [{ isOpen, selectedIndex }, dispatchSearchDropdown] = React.useReducer(
    globalSearchDropdownReducer,
    initialGlobalSearchDropdownState
  );
  const debouncedSearch = useDebouncedValue(search, 300);

  const trimmedSearch = search.trim();
  const trimmedDebouncedSearch = debouncedSearch.trim();
  const canSearch = trimmedDebouncedSearch.length >= GLOBAL_SEARCH_MIN_LENGTH;
  const isDebouncingSearch =
    trimmedSearch.length >= GLOBAL_SEARCH_MIN_LENGTH && trimmedSearch !== trimmedDebouncedSearch;

  const searchQuery = useQuery({
    ...getGlobalSearchQueryOptions({
      page: 1,
      query: trimmedDebouncedSearch,
      size: GLOBAL_SEARCH_PAGE_SIZE
    }),
    enabled: canSearch
  });

  const results = searchQuery.data?.data.results ?? [];
  const isSearchLoading = isDebouncingSearch || searchQuery.isFetching;

  const closeSearch = React.useCallback(() => {
    dispatchSearchDropdown({ type: 'close' });
  }, []);

  const openResult = React.useCallback(
    (result: GlobalSearchResult) => {
      setSearch('');
      dispatchSearchDropdown({ type: 'clear' });
      history.push(result.url);
    },
    [history]
  );

  React.useEffect(() => {
    if (trimmedSearch.length < GLOBAL_SEARCH_MIN_LENGTH) {
      dispatchSearchDropdown({ type: 'clear' });
    }
  }, [trimmedSearch.length]);

  React.useEffect(() => {
    if (!canSearch) return;

    dispatchSearchDropdown({ type: 'open' });
    dispatchSearchDropdown({
      selectedIndex: results.length ? 0 : -1,
      type: 'select'
    });
  }, [canSearch, results.length, trimmedDebouncedSearch]);

  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) closeSearch();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [closeSearch]);

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSearch();
      return;
    }

    if (!isOpen || !results.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      dispatchSearchDropdown({ selectedIndex: (selectedIndex + 1) % results.length, type: 'select' });
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      dispatchSearchDropdown({
        selectedIndex: selectedIndex <= 0 ? results.length - 1 : selectedIndex - 1,
        type: 'select'
      });
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const selectedResult = results[selectedIndex];
      if (selectedResult) openResult(selectedResult);
    }
  };

  return (
    <div ref={searchRef} className='relative w-full max-w-lg flex-1 min-[1020px]:w-auto'>
      <SearchIcon className='text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2' />
      <Input
        aria-activedescendant={
          isOpen && selectedIndex >= 0 ? `global-search-result-${results[selectedIndex]?.id}` : undefined
        }
        aria-expanded={isOpen}
        className='bg-muted h-10 rounded-2xl border-0 pr-10 pl-12 shadow-none focus-visible:ring-2'
        value={search}
        aria-autocomplete='list'
        aria-controls='global-search-results'
        onChange={(event) => {
          setSearch(event.target.value);
          if (event.target.value.trim().length >= GLOBAL_SEARCH_MIN_LENGTH) {
            dispatchSearchDropdown({ type: 'open' });
          }
        }}
        onFocus={() => {
          if (trimmedSearch.length >= GLOBAL_SEARCH_MIN_LENGTH) {
            dispatchSearchDropdown({ type: 'open' });
          }
        }}
        onKeyDown={handleSearchKeyDown}
        placeholder='Search courses, lessons...'
        role='combobox'
      />
      {isSearchLoading && (
        <Spinner className='text-muted-foreground absolute top-1/2 right-4 size-4 -translate-y-1/2' />
      )}
      {isOpen && trimmedSearch.length >= GLOBAL_SEARCH_MIN_LENGTH && (
        <SearchDropdown
          results={results}
          selectedIndex={selectedIndex}
          isError={searchQuery.isError}
          isLoading={isSearchLoading}
          onResultHover={(index) =>
            dispatchSearchDropdown({ selectedIndex: index, type: 'select' })
          }
          onResultSelect={openResult}
        />
      )}
    </div>
  );
};
