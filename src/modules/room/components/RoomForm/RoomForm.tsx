import { useLingui } from '@lingui/react/macro';

import { roomStatusOptions, roomTypeOptions } from '@/modules/room/constants';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

import type { RoomFormSchema } from './constants';

import { roomFormSchema } from './constants';

interface Props {
  defaultValues?: Room;
  formId: string;
  onSubmit: (value: PostRoomDto | PutRoomDto) => void;
}

export const RoomForm = ({ defaultValues, onSubmit, formId }: Props) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: roomFormSchema() },
    defaultValues: {
      building: defaultValues?.building ?? '',
      capacity: defaultValues?.capacity?.toString() ?? '',
      description: defaultValues?.description ?? '',
      floor: defaultValues?.floor?.toString() ?? '',
      hasComputers: defaultValues?.hasComputers ?? false,
      hasProjector: defaultValues?.hasProjector ?? false,
      name: defaultValues?.name ?? '',
      roomType: defaultValues?.roomType ?? 'CLASS_ROOM',
      status: defaultValues?.status ?? 'ACTIVE'
    } satisfies RoomFormSchema as RoomFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        building: value.building,
        capacity: Number(value.capacity),
        description: value.description,
        floor: Number(value.floor),
        hasComputers: value.hasComputers,
        hasProjector: value.hasProjector,
        name: value.name,
        roomType: value.roomType,
        status: value.status
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
        <form.AppField name='name'>
          {(field) => <field.Input isRequired label={t`Name`} placeholder={t`Room name`} />}
        </form.AppField>
        <form.AppField name='roomType'>
          {(field) => (
            <field.Select isRequired label={t`Type`} placeholder={t`Select room type`}>
              {roomTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </field.Select>
          )}
        </form.AppField>
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
        <div className='grid grid-cols-2 gap-3'>
          <form.AppField name='building'>
            {(field) => <field.Input isRequired label={t`Building`} placeholder={t`Building A`} />}
          </form.AppField>
          <form.AppField name='floor'>
            {(field) => (
              <field.Input isRequired label={t`Floor`} type='number' placeholder='1' />
            )}
          </form.AppField>
        </div>
        <form.AppField name='capacity'>
          {(field) => (
            <field.Input isRequired label={t`Capacity`} type='number' placeholder='20' />
          )}
        </form.AppField>
        <form.AppField name='description'>
          {(field) => (
            <field.Textarea label={t`Description`} placeholder={t`Optional notes about the room`} />
          )}
        </form.AppField>
        <form.AppField name='hasProjector'>
          {(field) => <field.Checkbox label={t`Has projector`} />}
        </form.AppField>
        <form.AppField name='hasComputers'>
          {(field) => <field.Checkbox label={t`Has computers`} />}
        </form.AppField>
      </form>
    </form.AppForm>
  );
};
