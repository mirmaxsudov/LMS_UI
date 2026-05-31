import { useLingui } from '@lingui/react/macro';

import { Button } from '@/shared/ui/button';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

import type {
  ParentProfileFormSchema,
  ProfileCreateFormRole,
  StudentProfileFormSchema,
  TeacherProfileFormSchema
} from './constants';

import {
  genderOptions,
  parentProfileFormSchema,
  studentProfileFormSchema,
  studentStatusOptions,
  teacherPositionOptions,
  teacherProfileFormSchema,
  userStatusOptions
} from './constants';
import { ProfileFileField } from './ProfileFileField';

interface ProfileCreateFormProps {
  isSubmitting?: boolean;
  role: ProfileCreateFormRole;
  submitLabel?: string;
  onSubmit: (value: PostParentDto | PostStudentDto | PostTeacherDto) => void;
}

const defaultSharedValues = {
  birthDate: '',
  email: '',
  firstName: '',
  gender: 'MALE' as Gender,
  lastName: '',
  middleName: '',
  password: '',
  phoneNumber: '',
  profileBackgroundAttachment: null,
  profileImage: null,
  status: 'ACTIVE' as UserStatus
};

const parseStudentIds = (value: string) =>
  value
    .split(/[\n,]/)
    .map((studentId) => studentId.trim())
    .filter(Boolean);

const buildSharedDto = (
  value: ParentProfileFormSchema | StudentProfileFormSchema | TeacherProfileFormSchema
): BaseUserProfileCreateDto => ({
  birthDate: value.birthDate || undefined,
  email: value.email,
  firstName: value.firstName,
  gender: value.gender,
  lastName: value.lastName,
  middleName: value.middleName || undefined,
  password: value.password,
  phoneNumber: value.phoneNumber,
  profileBackgroundAttachment: value.profileBackgroundAttachment,
  profileImage: value.profileImage,
  roles: [],
  status: value.status
});

const getFormConfig = (role: ProfileCreateFormRole) => {
  if (role === 'teacher') {
    return {
      schema: teacherProfileFormSchema(),
      defaultValues: {
        ...defaultSharedValues,
        position: 'LECTURER' as TeacherPositon
      } satisfies TeacherProfileFormSchema as TeacherProfileFormSchema
    };
  }

  if (role === 'student') {
    return {
      schema: studentProfileFormSchema(),
      defaultValues: {
        ...defaultSharedValues,
        studentId: '',
        studentStatus: 'ACTIVE' as StudentStatus
      } satisfies StudentProfileFormSchema as StudentProfileFormSchema
    };
  }

  return {
    schema: parentProfileFormSchema(),
    defaultValues: {
      ...defaultSharedValues,
      studentIdsText: ''
    } satisfies ParentProfileFormSchema as ParentProfileFormSchema
  };
};

export const ProfileCreateForm = ({
  role,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: ProfileCreateFormProps) => {
  const { t } = useLingui();
  const formConfig = getFormConfig(role);

  const form = useAppForm({
    validators: { onChange: formConfig.schema },
    defaultValues: formConfig.defaultValues,
    onSubmit: ({ value }) => {
      const sharedDto = buildSharedDto(value);

      if (role === 'teacher') {
        onSubmit({
          ...sharedDto,
          position: (value as TeacherProfileFormSchema).position
        });
        return;
      }

      if (role === 'student') {
        const studentValue = value as StudentProfileFormSchema;
        onSubmit({
          ...sharedDto,
          studentStatus: studentValue.studentStatus
        });
        return;
      }

      onSubmit({
        ...sharedDto,
        studentIds: parseStudentIds((value as ParentProfileFormSchema).studentIdsText)
      });
    }
  });

  return (
    <form.AppForm>
      <form
        className='grid p-1 max-h-[72vh] gap-4 overflow-y-auto pr-1'
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <div className='grid gap-3 sm:grid-cols-2'>
          <form.AppField name='firstName'>
            {(field) => (
              <field.Input isRequired label={t`First name`} placeholder={t`First name`} />
            )}
          </form.AppField>
          <form.AppField name='lastName'>
            {(field) => <field.Input isRequired label={t`Last name`} placeholder={t`Last name`} />}
          </form.AppField>
          <form.AppField name='middleName'>
            {(field) => <field.Input label={t`Middle name`} placeholder={t`Middle name`} />}
          </form.AppField>
          <form.AppField name='birthDate'>
            {(field) => <field.DatePicker label={t`Birth date`} placeholder={t`Birth date`} />}
          </form.AppField>
        </div>

        <div className='grid gap-3 sm:grid-cols-2'>
          <form.AppField name='gender'>
            {(field) => (
              <field.Select isRequired label={t`Gender`} placeholder={t`Select gender`}>
                {genderOptions.map((option) => (
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
                {userStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>
          <form.AppField name='email'>
            {(field) => <field.Input isRequired label={t`Email`} placeholder='user@example.com' />}
          </form.AppField>
          <form.AppField name='phoneNumber'>
            {(field) => (
              <field.PhoneInput isRequired label={t`Phone number`} placeholder='+998901234567' />
            )}
          </form.AppField>
          <form.AppField name='password'>
            {(field) => (
              <field.PasswordInput isRequired label={t`Password`} placeholder={t`Password`} />
            )}
          </form.AppField>
        </div>

        {role === 'teacher' && (
          <form.AppField name='position'>
            {(field) => (
              <field.Select isRequired label={t`Position`} placeholder={t`Select position`}>
                {teacherPositionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>
        )}

        {role === 'student' && (
          <div className='grid gap-3 sm:grid-cols-2'>
            <form.AppField name='studentId'>
              {(field) => <field.Input label={t`Student ID`} placeholder={t`Optional UUID`} />}
            </form.AppField>
            <form.AppField name='studentStatus'>
              {(field) => (
                <field.Select
                  isRequired
                  label={t`Student status`}
                  placeholder={t`Select student status`}
                >
                  {studentStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(option.label)}
                    </SelectItem>
                  ))}
                </field.Select>
              )}
            </form.AppField>
          </div>
        )}

        {role === 'parent' && (
          <form.AppField name='studentIdsText'>
            {(field) => (
              <field.Textarea
                label={t`Student profile IDs`}
                placeholder={t`Paste student profile UUIDs, separated by commas or new lines`}
                rows={3}
              />
            )}
          </form.AppField>
        )}

        <div className='grid gap-3 sm:grid-cols-2'>
          <form.AppField name='profileImage'>
            {(field) => (
              <ProfileFileField
                disabled={isSubmitting}
                file={field.state.value}
                label={t`Profile image`}
                onFileChange={field.handleChange}
              />
            )}
          </form.AppField>
          <form.AppField name='profileBackgroundAttachment'>
            {(field) => (
              <ProfileFileField
                disabled={isSubmitting}
                file={field.state.value}
                label={t`Profile background`}
                onFileChange={field.handleChange}
              />
            )}
          </form.AppField>
        </div>

        <Button className='mt-1' type='submit' loading={isSubmitting}>
          {submitLabel ?? t`Create`}
        </Button>
      </form>
    </form.AppForm>
  );
};
