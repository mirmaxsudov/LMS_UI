import type { ReactNode } from 'react';

import React from 'react';

import type { FormControlProps } from './FormBase.tsx';

import { Select, SelectContent, SelectTrigger, SelectValue } from '../select.tsx';
import { FormBase } from './FormBase.tsx';
import { useFieldContext } from './hooks.ts';

interface Props extends FormControlProps, React.ComponentProps<typeof Select> {
  children: ReactNode;
  placeholder?: string;
}

export const FormSelect = ({
  children,
  label,
  isRequired,
  description,
  placeholder,
  ...props
}: Props) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase isRequired={isRequired} label={label} description={description}>
      <Select value={field.state.value} onValueChange={field.handleChange} {...props}>
        <SelectTrigger aria-invalid={isInvalid} id={field.name} onBlur={field.handleBlur}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FormBase>
  );
};
