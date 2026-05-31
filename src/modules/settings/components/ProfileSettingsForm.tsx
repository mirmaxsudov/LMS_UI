import { useLingui } from '@lingui/react/macro';
import { SaveIcon } from 'lucide-react';

import { useUpdateProfileSettings } from '@/modules/settings/hooks/useUpdateProfileSettings';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

import type { ProfileSettingsFormSchema } from './constants';

import { genderOptions, profileSettingsFormSchema } from './constants';
import { toProfileSettingsFormData } from './profile-settings-form-data';
import { ProfileImageField } from './ProfileImageField';

interface ProfileSettingsFormProps {
  user: User;
}

const toDateInputValue = (value?: string | null) => value?.split('T')[0] ?? '';

const buildDefaultValues = (user: User) =>
  ({
    birthDate: toDateInputValue(user.birthDate),
    email: user.email ?? '',
    firstName: user.firstName ?? '',
    gender: user.gender ?? 'MALE',
    lastName: user.lastName ?? '',
    middleName: user.middleName ?? '',
    phoneNumber: user.phoneNumber ?? '',
    profileBackgroundImage: null,
    profileImage: null
  }) satisfies ProfileSettingsFormSchema as ProfileSettingsFormSchema;

export const ProfileSettingsForm = ({ user }: ProfileSettingsFormProps) => {
  const { t } = useLingui();
  const updateProfileMutation = useUpdateProfileSettings();

  const form = useAppForm({
    validators: { onChange: profileSettingsFormSchema() },
    defaultValues: buildDefaultValues(user),
    onSubmit: ({ value }) => {
      updateProfileMutation.mutate({ data: toProfileSettingsFormData(value) });
    }
  });

  return (
    <Card className='rounded-lg'>
      <CardHeader>
        <CardTitle className='text-2xl'>{t`Profile settings`}</CardTitle>
        <CardDescription className='text-base'>
          {t`Manage your personal information and account settings.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form.AppForm>
          <form
            className='grid gap-6'
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div className='grid gap-4 sm:grid-cols-2'>
              <form.AppField name='firstName'>
                {(field) => (
                  <field.Input
                    isRequired
                    disabled={updateProfileMutation.isPending}
                    label={t`First name`}
                    placeholder={t`First name`}
                  />
                )}
              </form.AppField>
              <form.AppField name='lastName'>
                {(field) => (
                  <field.Input
                    isRequired
                    disabled={updateProfileMutation.isPending}
                    label={t`Last name`}
                    placeholder={t`Last name`}
                  />
                )}
              </form.AppField>
              <form.AppField name='middleName'>
                {(field) => (
                  <field.Input
                    disabled={updateProfileMutation.isPending}
                    label={t`Middle name`}
                    placeholder={t`Middle name`}
                  />
                )}
              </form.AppField>
              <form.AppField name='birthDate'>
                {(field) => <field.DatePicker label={t`Birth date`} placeholder={t`Birth date`} />}
              </form.AppField>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <form.AppField name='gender'>
                {(field) => (
                  <field.Select
                    isRequired
                    disabled={updateProfileMutation.isPending}
                    label={t`Gender`}
                    placeholder={t`Select gender`}
                  >
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {t(option.label)}
                      </SelectItem>
                    ))}
                  </field.Select>
                )}
              </form.AppField>
              <form.AppField name='email'>
                {(field) => (
                  <field.Input
                    isRequired
                    disabled={updateProfileMutation.isPending}
                    label={t`Email`}
                    placeholder='user@example.com'
                  />
                )}
              </form.AppField>
              <form.AppField name='phoneNumber'>
                {(field) => (
                  <field.PhoneInput
                    isRequired
                    disabled={updateProfileMutation.isPending}
                    label={t`Phone number`}
                    placeholder='+998901234567'
                  />
                )}
              </form.AppField>
            </div>

            <div className='grid gap-4 lg:grid-cols-2'>
              <form.AppField name='profileImage'>
                {(field) => (
                  <ProfileImageField
                    currentImageUrl={user.profileImageUrl}
                    disabled={updateProfileMutation.isPending}
                    file={field.state.value}
                    label={t`Profile image`}
                    onFileChange={field.handleChange}
                  />
                )}
              </form.AppField>
              <form.AppField name='profileBackgroundImage'>
                {(field) => (
                  <ProfileImageField
                    currentImageUrl={user.profileBackgroundUrl}
                    disabled={updateProfileMutation.isPending}
                    file={field.state.value}
                    label={t`Profile background`}
                    onFileChange={field.handleChange}
                  />
                )}
              </form.AppField>
            </div>

            <div className='flex justify-end border-t pt-6'>
              <Button type='submit' loading={updateProfileMutation.isPending}>
                {!updateProfileMutation.isPending && <SaveIcon />}
                {t`Save changes`}
              </Button>
            </div>
          </form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
};
