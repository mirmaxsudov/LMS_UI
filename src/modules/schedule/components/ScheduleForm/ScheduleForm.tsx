import { useLingui } from '@lingui/react/macro';

import { dayOfWeekOptions, GroupCombobox } from '@/modules/group';
import { RoomCombobox } from '@/modules/room';
import { Button } from '@/shared/ui/button';
import { FormBase } from '@/shared/ui/form/FormBase';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

import type { ScheduleFormSchema } from './constants';

import { scheduleFormSchema } from './constants';

interface ScheduleFormProps {
  defaultValues?: Schedule;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostScheduleDto) => void;
}

const toTimeInputValue = (value?: string) => value?.slice(0, 5) ?? '';

export const ScheduleForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: ScheduleFormProps) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: scheduleFormSchema() },
    defaultValues: {
      dayOfWeek: defaultValues?.dayOfWeek ?? 'MONDAY',
      endTime: toTimeInputValue(defaultValues?.endTime),
      group: {
        label: defaultValues?.groupName ?? '',
        value: defaultValues?.groupId ?? ''
      },
      room: {
        label: defaultValues?.roomName ?? '',
        value: defaultValues?.roomId ?? ''
      },
      startTime: toTimeInputValue(defaultValues?.startTime)
    } satisfies ScheduleFormSchema as ScheduleFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        dayOfWeek: value.dayOfWeek,
        endTime: value.endTime,
        groupId: value.group.value,
        roomId: value.room.value || null,
        startTime: value.startTime
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
        <form.AppField name='room'>
          {(field) => (
            <FormBase label={t`Room`}>
              <RoomCombobox
                value={field.state.value.value ? field.state.value : null}
                onValueChange={(option) => field.handleChange(option ?? { label: '', value: '' })}
              />
            </FormBase>
          )}
        </form.AppField>
        <form.AppField name='dayOfWeek'>
          {(field) => (
            <field.Select isRequired label={t`Day of week`} placeholder={t`Select day`}>
              {dayOfWeekOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </field.Select>
          )}
        </form.AppField>
        <div className='grid gap-3 sm:grid-cols-2'>
          <form.AppField name='startTime'>
            {(field) => <field.Input isRequired label={t`Start time`} type='time' />}
          </form.AppField>
          <form.AppField name='endTime'>
            {(field) => <field.Input isRequired label={t`End time`} type='time' />}
          </form.AppField>
        </div>
        <Button type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
