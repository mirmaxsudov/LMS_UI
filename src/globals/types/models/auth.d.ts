type UserRole =
  | 'ADMIN'
  | 'GUARDIAN'
  | 'MAINTAINER'
  | 'PARENT'
  | 'STUDENT'
  | 'SUPER_ADMIN'
  | 'SUPPORT_TEACHER'
  | 'TEACHER';
type Gender = 'FEMALE' | 'MALE';
type UserStatus = 'ACTIVE' | 'INACTIVE';

interface PostLoginDto {
  password: string;
  username: string;
}

interface TokenResponse {
  accessToken: string;
}

interface User {
  birthDate: Nullable<string>;
  email: string;
  firstName: string;
  gender: Gender;
  lastName: string;
  middleName: string;
  phoneNumber: Nullable<string>;
  profileBackgroundAttachmentId: Nullable<string>;
  profileBackgroundUrl: Nullable<string>;
  profileImageAttachmentId: Nullable<string>;
  profileImageUrl: Nullable<string>;
  roles: Role[];
  status: UserStatus;
}

interface Role {
  createdAt: string;
  deleted: boolean;
  deletedAt: Nullable<string>;
  description: string;
  id: string;
  name: string;
  permissions: Permission[];
  updatedAt: string;
}

interface Permission {
  category: string;
  code: string;
  createdAt: string;
  deleted: boolean;
  deletedAt: string;
  description: string;
  id: string;
  updatedAt: string;
}
