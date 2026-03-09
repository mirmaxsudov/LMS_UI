import React from 'react';

import type { FormControlProps } from './FormBase.tsx';

import { PasswordInput } from '../password-input.tsx';
import { FormBase } from './FormBase.tsx';
import { useFieldContext } from './hooks.ts';

type FormPasswordInputProps = FormControlProps & React.ComponentProps<typeof PasswordInput>;

export const FormPasswordInput = ({
  label,
  description,
  isRequired,
  ...props
}: FormPasswordInputProps) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase isRequired={isRequired} label={label} description={description}>
      <PasswordInput
        aria-invalid={isInvalid}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
    </FormBase>
  );
};
