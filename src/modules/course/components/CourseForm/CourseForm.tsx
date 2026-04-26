import { useLingui } from '@lingui/react/macro';

import type { CourseFormSchema } from '@/modules/course/components/CourseForm/constants';

import { courseFormSchema } from '@/modules/course/components/CourseForm/constants';
import { courseLevelOptions } from '@/modules/course/constants';
import { Button } from '@/shared/ui/button';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

interface Props {
  defaultValues?: Course;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: CourseRequest) => void;
}

export const CourseForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: Props) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: courseFormSchema() },
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      level: defaultValues?.level ?? 'BEGINNER',
      durationInMinutes: defaultValues?.durationInMinutes?.toString() ?? ''
    } satisfies CourseFormSchema as CourseFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        title: value.title,
        description: value.description,
        level: value.level,
        durationInMinutes: Number(value.durationInMinutes)
      });
    }
  });

  return (
    <form.AppForm>
      <form
        className='grid gap-3'
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppField name='title'>
          {(field) => <field.Input isRequired label={t`Title`} placeholder={t`Course title`} />}
        </form.AppField>
        <form.AppField name='description'>
          {(field) => (
            <field.Textarea
              isRequired
              label={t`Description`}
              placeholder={t`Course description`}
              rows={4}
            />
          )}
        </form.AppField>
        <form.AppField name='level'>
          {(field) => (
            <field.Select isRequired label={t`Level`} placeholder={t`Select level`}>
              {courseLevelOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </field.Select>
          )}
        </form.AppField>
        <form.AppField name='durationInMinutes'>
          {(field) => (
            <field.Input isRequired label={t`Duration (minutes)`} type='number' placeholder='90' />
          )}
        </form.AppField>
        <Button type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
