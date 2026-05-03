import { useLingui } from '@lingui/react/macro';

import type { LessonSessionFormSchema } from '@/modules/lesson-session/components/LessonSessionForm/constants';

import { GroupCombobox } from '@/modules/lesson-session/components/GroupCombobox';
import { LessonCombobox } from '@/modules/lesson-session/components/LessonCombobox';
import { lessonSessionFormSchema } from '@/modules/lesson-session/components/LessonSessionForm/constants';
import { lessonSessionStatusOptions } from '@/modules/lesson-session/constants';
import { Button } from '@/shared/ui/button';
import { FormBase } from '@/shared/ui/form/FormBase';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

interface Props {
  defaultValues?: LessonSession;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostLessonSessionDto | PutLessonSessionDto) => void;
}

const toDateTimeInputValue = (value?: string) => {
  if (!value) return '';
  return value.slice(0, 16);
};

export const LessonSessionForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: Props) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: lessonSessionFormSchema() },
    defaultValues: {
      endTime: toDateTimeInputValue(defaultValues?.endTime),
      group: {
        label: defaultValues?.groupName ?? '',
        value: defaultValues?.groupId ?? ''
      },
      lesson: {
        label: defaultValues?.lessonTitle ?? '',
        value: defaultValues?.lessonId ?? ''
      },
      startTime: toDateTimeInputValue(defaultValues?.startTime),
      status: defaultValues?.status ?? 'PLANNED'
    } satisfies LessonSessionFormSchema as LessonSessionFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        endTime: value.endTime,
        groupId: value.group.value,
        lessonId: value.lesson.value,
        startTime: value.startTime,
        status: value.status
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
        <form.AppField name='group'>
          {(field) => (
            <FormBase isRequired label={t`Group`}>
              <GroupCombobox
                value={field.state.value}
                onValueChange={(option) => field.handleChange(option ?? { label: '', value: '' })}
              />
            </FormBase>
          )}
        </form.AppField>
        <form.AppField name='lesson'>
          {(field) => (
            <FormBase isRequired label={t`Lesson`}>
              <LessonCombobox
                value={field.state.value}
                onValueChange={(option) => field.handleChange(option ?? { label: '', value: '' })}
              />
            </FormBase>
          )}
        </form.AppField>
        <form.AppField name='startTime'>
          {(field) => <field.Input isRequired label={t`Start time`} type='datetime-local' />}
        </form.AppField>
        <form.AppField name='endTime'>
          {(field) => <field.Input isRequired label={t`End time`} type='datetime-local' />}
        </form.AppField>
        <form.AppField name='status'>
          {(field) => (
            <field.Select isRequired label={t`Status`} placeholder={t`Select status`}>
              {lessonSessionStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </field.Select>
          )}
        </form.AppField>
        <Button type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
