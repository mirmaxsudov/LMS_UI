import { useLingui } from '@lingui/react/macro';

import { useAppForm } from '@/shared/ui/form/hooks';

import type { GenerateLessonSessionsFormSchema } from './constants';

import { generateLessonSessionsFormSchema } from './constants';

interface Props {
  formId: string;
  onSubmit: (value: PostGenerateLessonSessionsDto) => void;
}

export const GenerateLessonSessionsForm = ({ onSubmit, formId }: Props) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: generateLessonSessionsFormSchema() },
    defaultValues: {
      range: undefined
    } satisfies GenerateLessonSessionsFormSchema as GenerateLessonSessionsFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        fromDate: value.range!.from,
        toDate: value.range!.to
      });
    }
  });

  return (
    <form.AppForm>
      <form
        className='grid gap-3'
        id={formId}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppField name='range'>
          {(field) => (
            <field.DateRangePicker
              isRequired
              label={t`Date range`}
              placeholder={t`Select date range`}
            />
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  );
};
