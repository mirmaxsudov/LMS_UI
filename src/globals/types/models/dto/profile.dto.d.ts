interface UserProfileRoleDto {
  id?: string;
  permissions?: string[];
}

interface BaseUserProfileCreateDto {
  birthDate?: string;
  email: string;
  firstName: string;
  gender: Gender;
  lastName: string;
  middleName?: string;
  password: string;
  phoneNumber: string;
  profileBackgroundAttachment?: File | null;
  profileImage?: File | null;
  roles: UserProfileRoleDto[];
  status: UserStatus;
}

interface PostStudentDto extends BaseUserProfileCreateDto {
  studentStatus?: StudentStatus;
}

interface PostParentDto extends BaseUserProfileCreateDto {
  studentIds?: string[];
}

interface PostTeacherDto extends BaseUserProfileCreateDto {
  position?: TeacherPositon;
}
