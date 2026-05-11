import { useLingui } from '@lingui/react/macro';

import type { OnlineCourseModuleFormSchema } from '@/modules/online-course/components/OnlineCourseModuleForm/constants';

import { onlineCourseModuleFormSchema } from '@/modules/online-course/components/OnlineCourseModuleForm/constants';
import { onlineCourseContentStatusOptions } from '@/modules/online-course/constants';
import { Button } from '@/shared/ui/button';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

interface OnlineCourseModuleFormProps {
  defaultValues?: OnlineCourseModule;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostOnlineCourseModuleDto | PutOnlineCourseModuleDto) => void;
}

const toDateInputValue = (value?: string) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  return value.slice(0, 10);
};

export const OnlineCourseModuleForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: OnlineCourseModuleFormProps) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: onlineCourseModuleFormSchema() },
    defaultValues: {
      availableFrom: toDateInputValue(defaultValues?.availableFrom),
      description: defaultValues?.description ?? '',
      orderIndex: defaultValues?.orderIndex?.toString() ?? '',
      status: defaultValues?.status ?? 'DRAFT',
      title: defaultValues?.title ?? ''
    } satisfies OnlineCourseModuleFormSchema as OnlineCourseModuleFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        availableFrom: new Date(value.availableFrom).toISOString(),
        description: value.description,
        orderIndex: Number(value.orderIndex),
        status: value.status,
        title: value.title
      });
    }
  });

  return (
    <form.AppForm>
      <form
        className='grid gap-3'
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppField name='title'>
          {(field) => <field.Input isRequired label={t`Title`} placeholder={t`Module title`} />}
        </form.AppField>
        <form.AppField name='description'>
          {(field) => (
            <field.Textarea
              isRequired
              label={t`Description`}
              placeholder={t`Module description`}
              rows={3}
            />
          )}
        </form.AppField>
        <div className='grid gap-3 md:grid-cols-2'>
          <form.AppField name='orderIndex'>
            {(field) => (
              <field.Input isRequired label={t`Order index`} type='number' placeholder='0' />
            )}
          </form.AppField>
          <form.AppField name='availableFrom'>
            {(field) => <field.Input isRequired label={t`Available from`} type='date' />}
          </form.AppField>
          <form.AppField name='status'>
            {(field) => (
              <field.Select isRequired label={t`Status`} placeholder={t`Select status`}>
                {onlineCourseContentStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>
        </div>
        <Button type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
