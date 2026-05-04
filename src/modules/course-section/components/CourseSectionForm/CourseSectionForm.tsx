import { useLingui } from '@lingui/react/macro';

import { CourseCombobox } from '@/modules/course';
import { Button } from '@/shared/ui/button';
import { FormBase } from '@/shared/ui/form/FormBase';
import { useAppForm } from '@/shared/ui/form/hooks';

import type { CourseSectionFormSchema } from './constants';

import { courseSectionFormSchema } from './constants';

interface Props {
  defaultValues?: CourseSection;
  isCourseReadonly?: boolean;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostCourseSectionDto) => void;
}

export const CourseSectionForm = ({
  defaultValues,
  onSubmit,
  isCourseReadonly = false,
  isSubmitting = false,
  submitLabel
}: Props) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: courseSectionFormSchema() },
    defaultValues: {
      course: {
        value: defaultValues?.courseId ?? '',
        label: defaultValues?.courseTitle ?? ''
      },
      orderIndex: defaultValues?.orderIndex?.toString() ?? '',
      title: defaultValues?.title ?? ''
    } satisfies CourseSectionFormSchema as CourseSectionFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        courseId: value.course.value,
        orderIndex: Number(value.orderIndex),
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
        <form.AppField name='course'>
          {(field) => (
            <FormBase isRequired label={t`Course`}>
              <CourseCombobox
                disabled={isCourseReadonly}
                value={field.state.value}
                onValueChange={(option) => field.handleChange(option ?? { label: '', value: '' })}
              />
            </FormBase>
          )}
        </form.AppField>
        <form.AppField name='title'>
          {(field) => (
            <field.Input isRequired label={t`Title`} placeholder={t`Course section title`} />
          )}
        </form.AppField>
        <form.AppField name='orderIndex'>
          {(field) => (
            <field.Input isRequired label={t`Order index`} type='number' placeholder='0' />
          )}
        </form.AppField>
        <Button type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
