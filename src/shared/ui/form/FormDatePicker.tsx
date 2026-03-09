import { format } from 'date-fns';
import { ChevronDownIcon, Trash2Icon } from 'lucide-react';
import React from 'react';

import { formatDateToString } from '@/shared/lib/format.ts';
import { cn } from '@/shared/lib/utils.ts';

import type { FormControlProps } from './FormBase.tsx';

import { Button } from '../button.tsx';
import { Calendar } from '../calendar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '../popover.tsx';
import { FormBase } from './FormBase.tsx';
import { useFieldContext } from './hooks.ts';

interface Props extends FormControlProps {
  calendarProps?: React.ComponentProps<typeof Calendar>;
  placeholder?: string;
}

export const FormDatePicker = ({ calendarProps, placeholder, ...props }: Props) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const [open, setOpen] = React.useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <FormBase {...props}>
        <PopoverTrigger asChild>
          <Button
            className={cn('w-48 justify-between font-normal', {
              'text-muted-foreground': !field.state.value
            })}
            aria-invalid={isInvalid}
            id={field.name}
            variant='outline'
            onBlur={field.handleBlur}
          >
            {field.state.value
              ? format(field.state.value, 'dd/MM/yyyy')
              : placeholder || 'Sanani tanlang'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
      </FormBase>
      <PopoverContent align='start' className='w-auto overflow-hidden p-1'>
        <Calendar
          captionLayout='dropdown'
          {...calendarProps}
          selected={field.state.value ? new Date(field.state.value) : undefined}
          endMonth={new Date(3000, 0)}
          mode='single'
          onSelect={(date) => {
            field.handleChange(date ? formatDateToString(date) : '');
            setOpen(false);
          }}
        />
        {field.state.value && (
          <Button
            className='w-full'
            size='sm'
            variant='outline'
            onClick={() => field.handleChange('')}
          >
            <Trash2Icon />
            Tozalash
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};
