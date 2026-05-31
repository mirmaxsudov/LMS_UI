import { useLingui } from '@lingui/react/macro';
import { useMemo, useState } from 'react';

import type { RoleFormSchema } from '@/modules/role/components/RoleForm/constants';

import { roleFormSchema } from '@/modules/role/components/RoleForm/constants';
import { PermissionPicker } from '@/modules/role/components/RoleForm/PermissionPicker';
import { Button } from '@/shared/ui/button';
import { useAppForm } from '@/shared/ui/form/hooks';

interface PermissionOption {
  label: string;
  value: string;
}

interface RoleFormProps {
  defaultValues?: Role;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostRoleDto) => void;
}

export const RoleForm = ({
  defaultValues,
  isSubmitting = false,
  submitLabel,
  onSubmit
}: RoleFormProps) => {
  const { t } = useLingui();
  const defaultPermissions = useMemo<PermissionOption[]>(
    () =>
      defaultValues?.permissions.map((permission) => ({
        label: permission.code,
        value: permission.id
      })) ?? [],
    [defaultValues?.permissions]
  );
  const [selectedPermissions, setSelectedPermissions] =
    useState<PermissionOption[]>(defaultPermissions);

  const form = useAppForm({
    validators: { onChange: roleFormSchema() },
    defaultValues: {
      description: defaultValues?.description ?? '',
      name: defaultValues?.name ?? ''
    } satisfies RoleFormSchema as RoleFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        description: value.description.trim() || undefined,
        name: value.name,
        permissionIds: selectedPermissions.map((permission) => permission.value)
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
          {(field) => <field.Input isRequired label={t`Name`} placeholder='COURSE_MANAGER' />}
        </form.AppField>
        <form.AppField name='description'>
          {(field) => (
            <field.Textarea label={t`Description`} placeholder={t`What this role can do`} />
          )}
        </form.AppField>
        <PermissionPicker value={selectedPermissions} onValueChange={setSelectedPermissions} />
        <Button className='mt-1' type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
