import { useLingui } from '@lingui/react/macro';

import type { PermissionFormSchema } from '@/modules/permission/components/PermissionForm/constants';

import { permissionFormSchema } from '@/modules/permission/components/PermissionForm/constants';
import { permissionCategoryOptions } from '@/modules/permission/constants';
import { Button } from '@/shared/ui/button';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

interface PermissionFormProps {
  defaultValues?: Permission;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostPermissionDto) => void;
}

export const PermissionForm = ({
  defaultValues,
  isSubmitting = false,
  submitLabel,
  onSubmit
}: PermissionFormProps) => {
  const { t } = useLingui();

  const form = useAppForm({
    validators: { onChange: permissionFormSchema() },
    defaultValues: {
      action: defaultValues?.action ?? '',
      category: defaultValues?.category ?? 'USER',
      code: defaultValues?.code ?? '',
      description: defaultValues?.description ?? '',
      isSystem: defaultValues?.isSystem ?? false,
      module: defaultValues?.module ?? ''
    } satisfies PermissionFormSchema as PermissionFormSchema,
    onSubmit: ({ value }) => {
      onSubmit({
        action: value.action.trim() || undefined,
        category: value.category,
        code: value.code,
        description: value.description.trim() || undefined,
        isSystem: value.isSystem,
        module: value.module.trim() || undefined
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
        <form.AppField name='code'>
          {(field) => <field.Input isRequired label={t`Code`} placeholder='PERM_COURSE_VIEW' />}
        </form.AppField>
        <form.AppField name='description'>
          {(field) => (
            <field.Textarea label={t`Description`} placeholder={t`What this permission allows`} />
          )}
        </form.AppField>
        <div className='grid gap-3 md:grid-cols-2'>
          <form.AppField name='module'>
            {(field) => <field.Input label={t`Module`} placeholder='course' />}
          </form.AppField>
          <form.AppField name='action'>
            {(field) => <field.Input label={t`Action`} placeholder='view' />}
          </form.AppField>
        </div>
        <form.AppField name='category'>
          {(field) => (
            <field.Select isRequired label={t`Category`} placeholder={t`Select category`}>
              {permissionCategoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </field.Select>
          )}
        </form.AppField>
        <form.AppField name='isSystem'>
          {(field) => (
            <field.Checkbox
              label={t`System permission`}
              description={t`System permissions are protected from deletion.`}
            />
          )}
        </form.AppField>
        <Button className='mt-1' type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
