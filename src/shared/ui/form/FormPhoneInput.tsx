import React from 'react';

import type { FormControlProps } from './FormBase.tsx';

import { PhoneInput } from '../phone-input.tsx';
import { FormBase } from './FormBase.tsx';
import { useFieldContext } from './hooks.ts';

type FormPhoneInputProps = FormControlProps & React.ComponentProps<typeof PhoneInput>;

export const FormPhoneInput = ({
  label,
  description,
  isRequired,
  ...props
}: FormPhoneInputProps) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase isRequired={isRequired} label={label} description={description}>
      <PhoneInput
        aria-invalid={isInvalid}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={field.handleChange}
        {...props}
      />
    </FormBase>
  );
};
