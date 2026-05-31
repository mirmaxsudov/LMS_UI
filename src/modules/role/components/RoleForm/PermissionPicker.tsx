import { useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon } from 'lucide-react';
import { useMemo } from 'react';

import { getPermissionsQueryOptions } from '@/modules/permission';
import { Badge } from '@/shared/ui/badge';
import {
  MultiCombobox,
  MultiComboboxContent,
  MultiComboboxEmpty,
  MultiComboboxGroup,
  MultiComboboxInput,
  MultiComboboxItem,
  MultiComboboxList,
  MultiComboboxTrigger
} from '@/shared/ui/multi-combobox';

interface PermissionOption {
  label: string;
  value: string;
}

interface PermissionPickerProps {
  value: PermissionOption[];
  onValueChange: (value: PermissionOption[]) => void;
}

export const PermissionPicker = ({ value, onValueChange }: PermissionPickerProps) => {
  const { t } = useLingui();
  const permissionsQuery = useQuery(
    getPermissionsQueryOptions({
      page: 1,
      size: 100
    })
  );

  const permissionOptions = useMemo(() => {
    const options =
      permissionsQuery.data?.data.results.map((permission) => ({
        label: permission.code,
        value: permission.id
      })) ?? [];
    const selectedMissingFromPage = value.filter(
      (selected) => !options.some((option) => option.value === selected.value)
    );

    return [...selectedMissingFromPage, ...options];
  }, [permissionsQuery.data?.data.results, value]);

  return (
    <div className='grid gap-2'>
      <div className='text-sm font-medium'>{t`Assigned permissions`}</div>
      <MultiCombobox
        data={permissionOptions}
        value={value}
        onValueChange={onValueChange}
        placeholder={t`Select permissions`}
      >
        <MultiComboboxTrigger className='h-auto min-h-10 w-full justify-start px-3 py-2'>
          <div className='flex min-w-0 flex-1 flex-wrap gap-1'>
            {value.length ? (
              value.map((permission) => (
                <Badge key={permission.value} variant='secondary'>
                  {permission.label}
                </Badge>
              ))
            ) : (
              <span className='text-muted-foreground'>{t`Select permissions`}</span>
            )}
          </div>
        </MultiComboboxTrigger>
        <MultiComboboxContent>
          <MultiComboboxInput placeholder={t`Search permissions`} />
          <MultiComboboxList>
            <MultiComboboxEmpty>{t`No permissions found.`}</MultiComboboxEmpty>
            <MultiComboboxGroup>
              {permissionOptions.map((permission) => (
                <MultiComboboxItem
                  key={permission.value}
                  value={permission.value}
                  keywords={[permission.label]}
                >
                  <CheckIcon className='opacity-0' />
                  {permission.label}
                </MultiComboboxItem>
              ))}
            </MultiComboboxGroup>
          </MultiComboboxList>
        </MultiComboboxContent>
      </MultiCombobox>
      <p className='text-muted-foreground text-sm'>
        {t`The submitted permission list replaces the role's existing permissions.`}
      </p>
    </div>
  );
};
