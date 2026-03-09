import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { FormCheckbox } from './FormCheckbox';
import { FormDatePicker } from './FormDatePicker';
import { FormDateRangePicker } from './FormDateRangePicker';
import { FormInput } from './FormInput';
import { FormPasswordInput } from './FormPasswordInput';
import { FormPhoneInput } from './FormPhoneInput';
import { FormPriceInput } from './FormPriceInput';
import { FormSelect } from './FormSelect';
import { FormTextarea } from './FormTextarea';

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    PhoneInput: FormPhoneInput,
    PriceInput: FormPriceInput,
    PasswordInput: FormPasswordInput,
    Textarea: FormTextarea,
    Select: FormSelect,
    Checkbox: FormCheckbox,
    DatePicker: FormDatePicker,
    DateRangePicker: FormDateRangePicker
  },
  formComponents: {},
  fieldContext,
  formContext
});

export { useAppForm, useFieldContext, useFormContext };
