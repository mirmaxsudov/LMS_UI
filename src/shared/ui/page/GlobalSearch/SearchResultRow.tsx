import { BookOpenIcon, FileTextIcon, Layers3Icon } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils.ts';

const searchTypeMeta: Record<
  SearchResultType,
  {
    Icon: React.ComponentType<React.ComponentProps<'svg'>>;
    label: string;
  }
> = {
  COURSE: {
    Icon: BookOpenIcon,
    label: 'Course'
  },
  LESSON: {
    Icon: FileTextIcon,
    label: 'Lesson'
  },
  SECTION: {
    Icon: Layers3Icon,
    label: 'Section'
  }
};

interface SearchResultRowProps {
  isSelected: boolean;
  result: GlobalSearchResult;
  onMouseEnter: () => void;
  onSelect: () => void;
}

export const SearchResultRow = ({
  isSelected,
  onMouseEnter,
  onSelect,
  result
}: SearchResultRowProps) => {
  const { Icon, label } = searchTypeMeta[result.type];

  return (
    <button
      className={cn(
        'flex w-full min-w-0 items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
        isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/70'
      )}
      aria-selected={isSelected}
      id={`global-search-result-${result.id}`}
      type='button'
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      role='option'
    >
      <span className='bg-muted text-muted-foreground mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg'>
        <Icon className='size-4' />
      </span>
      <span className='min-w-0 flex-1'>
        <span className='flex min-w-0 items-center gap-2'>
          <span className='truncate text-sm font-medium'>{result.title}</span>
          <span className='text-muted-foreground shrink-0 text-[0.68rem] font-semibold tracking-wide uppercase'>
            {label}
          </span>
        </span>
        <span className='text-muted-foreground mt-0.5 block truncate text-xs'>
          {result.subtitle}
        </span>
        {result.description ? (
          <span className='text-muted-foreground/80 mt-1 block line-clamp-2 text-xs leading-snug'>
            {result.description}
          </span>
        ) : null}
      </span>
    </button>
  );
};
