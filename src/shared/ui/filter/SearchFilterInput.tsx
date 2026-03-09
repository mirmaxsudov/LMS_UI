import { SearchIcon } from 'lucide-react';
import { useMemo } from 'react';

import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { cn } from '@/shared/lib/utils';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/input-group';

interface SearchFilterInputProps {
  filter: FilterMap['search'];
  val?: string;
  setVal: (val: string | null) => void;
}

export const SearchFilterInput = ({ filter, setVal, val }: SearchFilterInputProps) => {
  const normalize = useMemo(
    () => (raw: string) => {
      const trimmed = filter.trim ? raw.trim() : raw;
      return trimmed === '' ? null : trimmed;
    },
    [filter.trim]
  );

  return (
    <InputGroup
      className={cn(
        "h-8 w-fit gap-1.5 rounded-md text-sm has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-4",
        filter.className
      )}
    >
      <InputGroupInput
        size='sm'
        value={val ?? ''}
        onChange={(e) => setVal(normalize(e.target.value))}
        placeholder={filter.placeholder}
      />
      <InputGroupAddon>{filter.icon ? <filter.icon /> : <SearchIcon />}</InputGroupAddon>
    </InputGroup>
  );
};
