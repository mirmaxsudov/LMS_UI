import { useLingui } from '@lingui/react/macro';
import { PlusCircle, XCircle } from 'lucide-react';
import React from 'react';

import type { FilterMap, Option } from '@/shared/ui/filter/FilterToolbar';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Separator } from '@/shared/ui/separator';

interface SelectFilterProps {
  filter: FilterMap['multiple-select'] | FilterMap['select'];
  multiple: boolean;
  val: string | null;
  setVal: (value: string | null) => void;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({ filter, multiple, setVal, val }) => {
  const { t } = useLingui();
  const [open, setOpen] = React.useState(false);

  const selectedValues = React.useMemo(() => {
    if (!val) return new Set<string>();
    return new Set(
      val
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    );
  }, [val]);

  const selectedSize = selectedValues.size;
  const hasSelection = selectedSize > 0;

  const getValueKey = (option: Option) => String(option.value);

  const updateSelected = React.useCallback(
    (values: Set<string>) => {
      if (values.size === 0) {
        setVal(null);
        return;
      }

      const serialized = Array.from(values).join(',');
      setVal(serialized);
    },
    [filter.key, setVal]
  );

  const onItemSelect = React.useCallback(
    (option: Option, isSelected: boolean) => {
      const key = getValueKey(option);
      const isMulti = multiple ?? filter.variant === 'multiple-select';

      if (isMulti) {
        const next = new Set<string>(selectedValues);
        if (isSelected) next.delete(key);
        else next.add(key);
        updateSelected(next);
      } else {
        if (isSelected) setVal(null);
        else setVal(key);
        setOpen(false);
      }
    },
    [multiple, filter.variant, selectedValues, updateSelected, setVal, filter.key]
  );

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      setVal(null);
      setOpen(false);
    },
    [setVal, setOpen, filter.key]
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button className='border-solid' size='sm' variant='outline'>
          {hasSelection ? (
            <div
              aria-label={t`Clear filter`}
              className='focus-visible:ring-ring rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-1 focus-visible:outline-none'
              tabIndex={0}
              onClick={onReset}
              role='button'
            >
              <XCircle />
            </div>
          ) : (
            <PlusCircle />
          )}

          <span className='ml-2'>{hasSelection ? '' : (filter.placeholder ?? t`Filter`)}</span>

          {hasSelection && (
            <>
              <Separator
                className='mx-0.5 data-[orientation=vertical]:h-4'
                orientation='vertical'
              />
              <div className='flex items-center gap-1'>
                {selectedSize > 2 ? (
                  <Badge className='rounded-sm px-1 font-normal' variant='secondary'>
                    {t`${selectedSize} selected`}
                  </Badge>
                ) : (
                  filter.options
                    .filter((option) => selectedValues.has(getValueKey(option)))
                    .map((option) => (
                      <Badge
                        key={getValueKey(option)}
                        className='rounded-sm px-1 font-normal'
                        variant='secondary'
                      >
                        {t(option.label)}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align='start' className='w-[12.5rem] p-0'>
        <Command>
          <CommandInput placeholder={filter.placeholder} />
          <CommandList className='max-h-full'>
            <CommandEmpty>{t`No results found.`}</CommandEmpty>

            <CommandGroup className='max-h-[18.75rem] overflow-x-hidden overflow-y-auto'>
              {filter.options.map((option) => {
                const key = getValueKey(option);
                const isSelected = selectedValues.has(key);

                return (
                  <CommandItem key={key} onSelect={() => onItemSelect(option, isSelected)}>
                    <Checkbox checked={isSelected} className='[&_svg]:text-white!' />
                    {'icon' in option && option.icon && <option.icon />}
                    <span className='truncate'>{t(option.label)}</span>
                    {'count' in option && option.count && (
                      <span className='ml-auto font-mono text-xs'>{option.count}</span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {hasSelection && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem className='justify-center text-center' onSelect={() => onReset()}>
                    {t`Clear filters`}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
