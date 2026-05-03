import { useLingui } from '@lingui/react/macro';

import type { LessonFormSchema } from '@/modules/lesson/components/LessonForm/constants';

import { CourseSectionCombobox } from '@/modules/lesson/components/CourseSectionCombobox';
import { lessonFormSchema } from '@/modules/lesson/components/LessonForm/constants';
import { Button } from '@/shared/ui/button';
import { FormBase } from '@/shared/ui/form/FormBase';
import { useAppForm } from '@/shared/ui/form/hooks';

interface Props {
  defaultValues?: Lesson;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostLessonDto | PutLessonDto) => void;
}

export const LessonForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: Props) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: lessonFormSchema() },
    defaultValues: {
      content: defaultValues?.content ?? '',
      durationInMinutes: defaultValues?.durationInMinutes?.toString() ?? '',
      section: {
        label: defaultValues?.sectionId ?? '',
        value: defaultValues?.sectionId ?? ''
      },
      title: defaultValues?.title ?? ''
    } satisfies LessonFormSchema as LessonFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        content: value.content,
        durationInMinutes: Number(value.durationInMinutes),
        sectionId: value.section.value,
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
          {(field) => <field.Input isRequired label={t`Title`} placeholder={t`Lesson title`} />}
        </form.AppField>
        <form.AppField name='section'>
          {(field) => (
            <FormBase isRequired label={t`Course section`}>
              <CourseSectionCombobox
                value={field.state.value}
                onValueChange={(option) => field.handleChange(option ?? { label: '', value: '' })}
              />
            </FormBase>
          )}
        </form.AppField>
        <form.AppField name='durationInMinutes'>
          {(field) => (
            <field.Input
              isRequired
              label={t`Duration (minutes)`}
              type='number'
              placeholder='45'
            />
          )}
        </form.AppField>
        <form.AppField name='content'>
          {(field) => (
            <field.Textarea isRequired label={t`Content`} placeholder={t`Lesson content`} rows={5} />
          )}
        </form.AppField>
        <Button type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
