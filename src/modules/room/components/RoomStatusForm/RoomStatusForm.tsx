import { useLingui } from '@lingui/react/macro';

import { roomStatusOptions } from '@/modules/room/constants';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

import type { RoomStatusFormSchema } from './constants';

import { roomStatusFormSchema } from './constants';

interface Props {
  defaultValues?: Room;
  formId: string;
  onSubmit: (value: PatchRoomStatusDto) => void;
}

export const RoomStatusForm = ({ defaultValues, onSubmit, formId }: Props) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: roomStatusFormSchema() },
    defaultValues: {
      status: defaultValues?.status ?? 'ACTIVE'
    } satisfies RoomStatusFormSchema as RoomStatusFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({ status: value.status });
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
        <form.AppField name='status'>
          {(field) => (
            <field.Select isRequired label={t`Status`} placeholder={t`Select status`}>
              {roomStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </field.Select>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  );
};
