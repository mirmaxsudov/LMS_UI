import type { ComponentProps } from 'react';

import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from 'lucide-react';
import { createContext, use, useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/shared/ui/command';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

interface MultiComboboxData {
  label: string;
  value: string;
}

export interface Option {
  label: string;
  value: string;
}

interface MultiComboboxContextType {
  data: MultiComboboxData[];
  emptyText?: string;
  open: boolean;
  placeholder?: string;
  value: Option[];
  width: number;
  onOpenChange: (open: boolean) => void;
  onValueChange: (value: Option[]) => void;
  setWidth: (width: number) => void;
}

const MultiComboboxContext = createContext<MultiComboboxContextType>({
  data: [],
  placeholder: '',
  emptyText: '',
  value: [],
  onValueChange: () => {},
  open: false,
  onOpenChange: () => {},
  width: 200,
  setWidth: () => {}
});

export type MultiComboboxProps = ComponentProps<typeof Popover> & {
  data: MultiComboboxData[];
  placeholder?: string;
  defaultValue?: Option[];
  emptyText?: string;
  value?: Option[];
  onValueChange?: (value: Option[]) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const MultiCombobox = ({
  data,
  placeholder,
  emptyText,
  defaultValue,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  ...props
}: MultiComboboxProps) => {
  const [value, onValueChange] = useControllableState({
    defaultProp: defaultValue ?? [],
    prop: controlledValue,
    onChange: controlledOnValueChange
  });
  const [open, onOpenChange] = useControllableState({
    defaultProp: defaultOpen,
    prop: controlledOpen,
    onChange: controlledOnOpenChange
  });
  const [width, setWidth] = useState(200);
  return (
    <MultiComboboxContext
      value={{
        placeholder,
        value,
        onValueChange,
        open,
        onOpenChange,
        data,
        width,
        setWidth
      }}
    >
      <Popover {...props} onOpenChange={onOpenChange} open={open} />
    </MultiComboboxContext>
  );
};

export type MultiComboboxTriggerProps = ComponentProps<typeof Button>;
export const MultiComboboxTrigger = ({
  children,
  className,
  ...props
}: MultiComboboxTriggerProps) => {
  const { value, placeholder, open, setWidth } = use(MultiComboboxContext);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    // Create a ResizeObserver to detect width changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = (entry.target as HTMLElement).offsetWidth;
        if (newWidth) {
          setWidth?.(newWidth);
        }
      }
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [setWidth]);
  return (
    <PopoverTrigger asChild>
      <Button
        aria-expanded={open}
        className={cn('hover:bg-background', className)}
        variant='outline'
        role='combobox'
        {...props}
        ref={ref}
      >
        {children ?? (
          <span className='flex w-full items-center justify-between gap-2'>
            <span className='text-foreground flex min-w-0 flex-1 flex-wrap gap-1 gap-2 text-left'>
              {value.map(({ label }) => label).join(', ') || placeholder || 'Select...'}
            </span>
            <ChevronsUpDownIcon className='text-muted-foreground shrink-0' size={16} />
          </span>
        )}
      </Button>
    </PopoverTrigger>
  );
};

export type MultiComboboxContentProps = ComponentProps<typeof Command> & {
  popoverOptions?: ComponentProps<typeof PopoverContent>;
};
export const MultiComboboxContent = ({
  className,
  popoverOptions,
  ...props
}: MultiComboboxContentProps) => {
  const { width } = use(MultiComboboxContext);
  return (
    <PopoverContent className={cn('p-1', className)} style={{ width }} {...popoverOptions}>
      <Command {...props} />
    </PopoverContent>
  );
};

export type MultiComboboxInputProps = ComponentProps<typeof Input>;
export const MultiComboboxInput = ({ className, ...props }: MultiComboboxInputProps) => {
  const { placeholder } = use(MultiComboboxContext);
  return (
    <div className='p-1 pb-2'>
      <div className='relative'>
        <Input className={cn('pr-8', className)} size='sm' placeholder={placeholder} {...props} />
        <SearchIcon className='text-muted-foreground absolute top-1/2 right-3 size-4 -translate-y-1/2' />
      </div>
    </div>
  );
};

export type MultiComboboxListProps = ComponentProps<typeof CommandList>;
export const MultiComboboxList = (props: MultiComboboxListProps) => <CommandList {...props} />;

export type MultiComboboxEmptyProps = ComponentProps<typeof CommandEmpty>;
export const MultiComboboxEmpty = ({ children, ...props }: MultiComboboxEmptyProps) => {
  return <CommandEmpty {...props}>{children}</CommandEmpty>;
};

export type MultiComboboxGroupProps = ComponentProps<typeof CommandGroup>;
export const MultiComboboxGroup = (props: MultiComboboxGroupProps) => <CommandGroup {...props} />;

export type MultiComboboxItemProps = ComponentProps<typeof CommandItem>;
export const MultiComboboxItem = ({
  className,
  children,
  value: _value,
  ...props
}: MultiComboboxItemProps) => {
  const { onValueChange, value, data } = use(MultiComboboxContext);
  const values = value.map((item) => item.value);
  return (
    <div className='relative'>
      <CommandItem
        className={cn('pr-8', className)}
        value={_value}
        onSelect={(currentValue) => {
          const newValue = data.find((item) => item.value === currentValue);
          if (newValue)
            if (values.includes(newValue.value))
              onValueChange(value.filter((item) => item.value !== newValue.value));
            else onValueChange([...value, newValue]);
        }}
        {...props}
      >
        {children}
        {_value && values.includes(_value) && (
          <CheckIcon className='text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2' />
        )}
      </CommandItem>
    </div>
  );
};
export type MultiComboboxSeparatorProps = ComponentProps<typeof CommandSeparator>;
export const MultiComboboxSeparator = (props: MultiComboboxSeparatorProps) => (
  <CommandSeparator {...props} />
);
