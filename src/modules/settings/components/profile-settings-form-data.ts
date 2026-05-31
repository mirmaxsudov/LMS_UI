import type { ProfileSettingsFormSchema } from './constants';

type ProfileSettingsRequestPart = Partial<
  Pick<
    ProfileSettingsFormSchema,
    'birthDate' | 'email' | 'firstName' | 'gender' | 'lastName' | 'middleName' | 'phoneNumber'
  >
>;

const appendOptionalFile = (formData: FormData, key: string, file?: File | null) => {
  if (!file) return;
  formData.append(key, file);
};

const appendRequestPart = (formData: FormData, request: ProfileSettingsRequestPart) => {
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], {
      type: 'application/json'
    })
  );
};

export const toProfileSettingsFormData = (data: ProfileSettingsFormSchema) => {
  const formData = new FormData();
  const request = {
    birthDate: data.birthDate || undefined,
    email: data.email,
    firstName: data.firstName,
    gender: data.gender,
    lastName: data.lastName,
    middleName: data.middleName || undefined,
    phoneNumber: data.phoneNumber
  } satisfies ProfileSettingsRequestPart;

  appendRequestPart(formData, request);
  appendOptionalFile(formData, 'profileImage', data.profileImage);
  appendOptionalFile(formData, 'profileBackgroundImage', data.profileBackgroundImage);

  return formData;
};
