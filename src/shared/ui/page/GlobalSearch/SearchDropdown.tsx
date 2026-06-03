import { Spinner } from '@/shared/ui/spinner';

import { SearchResultRow } from './SearchResultRow.tsx';

interface SearchDropdownProps {
  isError: boolean;
  isLoading: boolean;
  results: GlobalSearchResult[];
  selectedIndex: number;
  onResultHover: (index: number) => void;
  onResultSelect: (result: GlobalSearchResult) => void;
}

export const SearchDropdown = ({
  isError,
  isLoading,
  onResultHover,
  onResultSelect,
  results,
  selectedIndex
}: SearchDropdownProps) => {
  return (
    <div
      className='bg-popover text-popover-foreground absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border shadow-xl'
      id='global-search-results'
      role='listbox'
    >
      {isLoading && !results.length ? (
        <div className='flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground'>
          <Spinner className='size-4' />
          Searching...
        </div>
      ) : isError ? (
        <div className='px-4 py-3 text-sm text-muted-foreground'>
          Search is unavailable right now.
        </div>
      ) : results.length ? (
        <div className='max-h-[min(24rem,calc(100vh-7rem))] overflow-y-auto p-1.5'>
          {results.map((result, index) => (
            <SearchResultRow
              key={`${result.type}-${result.id}`}
              isSelected={index === selectedIndex}
              result={result}
              onMouseEnter={() => onResultHover(index)}
              onSelect={() => onResultSelect(result)}
            />
          ))}
        </div>
      ) : (
        <div className='px-4 py-3 text-sm text-muted-foreground'>No results found.</div>
      )}
    </div>
  );
};
