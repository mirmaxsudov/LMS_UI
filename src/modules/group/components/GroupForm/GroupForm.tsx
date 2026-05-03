import { useLingui } from '@lingui/react/macro';

import type { GroupFormSchema } from '@/modules/group/components/GroupForm/constants';

import { CourseCombobox } from '@/modules/course';
import { groupFormSchema } from '@/modules/group/components/GroupForm/constants';
import { dayOfWeekOptions, groupStatusOptions, scheduleTypeOptions } from '@/modules/group/constants';
import { TeacherCombobox } from '@/modules/users/teacher';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { FormBase } from '@/shared/ui/form/FormBase';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

interface Props {
  defaultValues?: Group;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostGroupDto | PutGroupDto) => void;
}

const getTeacherName = (teacher?: GroupTeacher) =>
  [teacher?.firstName, teacher?.middleName, teacher?.lastName].filter(Boolean).join(' ');

export const GroupForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: Props) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: groupFormSchema() },
    defaultValues: {
      active: defaultValues?.active ?? true,
      capacity: defaultValues?.capacity?.toString() ?? '',
      course: {
        label: defaultValues?.courseName ?? '',
        value: defaultValues?.courseId ?? ''
      },
      name: defaultValues?.name ?? '',
      scheduleDays: defaultValues?.scheduleDays ?? [],
      scheduleType: defaultValues?.scheduleType ?? 'EXACT_DAYS',
      status: defaultValues?.status ?? 'FORMING',
      teacher: {
        label: getTeacherName(defaultValues?.teacher),
        value: defaultValues?.teacher.teacherId ?? ''
      }
    } satisfies GroupFormSchema as GroupFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        active: value.active,
        capacity: Number(value.capacity),
        courseId: value.course.value,
        name: value.name,
        scheduleDays: value.scheduleDays,
        scheduleType: value.scheduleType,
        status: value.status,
        teacherId: value.teacher.value
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
        <form.AppField name='name'>
          {(field) => <field.Input isRequired label={t`Name`} placeholder={t`Group name`} />}
        </form.AppField>
        <form.AppField name='course'>
          {(field) => (
            <FormBase isRequired label={t`Course`}>
              <CourseCombobox
                value={field.state.value}
                onValueChange={(option) => field.handleChange(option ?? { label: '', value: '' })}
              />
            </FormBase>
          )}
        </form.AppField>
        <form.AppField name='teacher'>
          {(field) => (
            <FormBase isRequired label={t`Teacher`}>
              <TeacherCombobox
                value={field.state.value}
                onValueChange={(option) => field.handleChange(option ?? { value: '', label: '' })}
              />
            </FormBase>
          )}
        </form.AppField>
        <form.AppField name='capacity'>
          {(field) => <field.Input isRequired label={t`Capacity`} type='number' placeholder='20' />}
        </form.AppField>
        <form.AppField name='scheduleType'>
          {(field) => (
            <field.Select isRequired label={t`Schedule type`} placeholder={t`Select schedule type`}>
              {scheduleTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </field.Select>
          )}
        </form.AppField>
        <form.AppField name='scheduleDays'>
          {(field) => (
            <FormBase label={t`Schedule days`}>
              <div className='grid grid-cols-2 gap-2'>
                {dayOfWeekOptions.map((option) => {
                  const checked = field.state.value.includes(option.value);

                  return (
                    <label
                      key={option.value}
                      className='flex items-center gap-2 rounded-md border p-2 text-sm'
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(nextChecked) => {
                          if (nextChecked) {
                            field.handleChange([...field.state.value, option.value]);
                            return;
                          }
                          field.handleChange(
                            field.state.value.filter((value) => value !== option.value)
                          );
                        }}
                      />
                      {t(option.label)}
                    </label>
                  );
                })}
              </div>
            </FormBase>
          )}
        </form.AppField>
        <form.AppField name='status'>
          {(field) => (
            <field.Select isRequired label={t`Status`} placeholder={t`Select status`}>
              {groupStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </field.Select>
          )}
        </form.AppField>
        <form.AppField name='active'>
          {(field) => <field.Checkbox label={t`Active`} />}
        </form.AppField>
        <Button type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
