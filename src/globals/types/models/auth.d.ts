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

interface Role {
  createdAt: string;
  deleted: boolean;
  deletedAt: Nullable<string>;
  description: string;
  id: string;
  name: UserRole;
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
