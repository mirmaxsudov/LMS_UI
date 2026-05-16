export const toUserProfileFormData = (data: BaseUserProfileCreateDto) => {
  const formData = new FormData();

  appendOptionalValue(formData, 'firstName', data.firstName);
  appendOptionalValue(formData, 'lastName', data.lastName);
  appendOptionalValue(formData, 'middleName', data.middleName);
  appendOptionalValue(formData, 'gender', data.gender);
  appendOptionalValue(formData, 'birthDate', toLocalDateTime(data.birthDate));
  appendOptionalValue(formData, 'phoneNumber', data.phoneNumber);
  appendOptionalValue(formData, 'email', data.email);
  appendOptionalValue(formData, 'password', data.password);
  appendOptionalValue(formData, 'status', data.status);
  appendOptionalFile(formData, 'profileImage', data.profileImage);
  appendOptionalFile(formData, 'profileBackgroundAttachment', data.profileBackgroundAttachment);
  appendRoles(formData, data.roles);

  return formData;
};

export const appendOptionalValue = (formData: FormData, key: string, value?: string) => {
  if (!value) return;
  formData.append(key, value);
};

const appendRoles = (formData: FormData, roles: UserProfileRoleDto[]) => {
  roles.forEach((role, roleIndex) => {
    appendOptionalValue(formData, `roles[${roleIndex}].id`, role.id);
    role.permissions?.forEach((permissionId, permissionIndex) => {
      appendOptionalValue(
        formData,
        `roles[${roleIndex}].permissions[${permissionIndex}]`,
        permissionId
      );
    });
  });
};

const appendOptionalFile = (formData: FormData, key: string, file?: File | null) => {
  if (!file) return;
  formData.append(key, file);
};

const toLocalDateTime = (date?: string) => {
  if (!date) return undefined;
  return date.includes('T') ? date : `${date}T00:00:00`;
};
