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
type UserStatus = 'ACTIVE' | 'BLOCKED' | 'INACTIVE';

type PermissionCategory =
  | 'ATTENDANCE'
  | 'COURSE'
  | 'ENROLLMENT'
  | 'GROUP'
  | 'LESSON'
  | 'SYSTEM'
  | 'USER';

interface PostLoginDto {
  password: string;
  username: string;
}

interface TokenResponse {
  accessToken: string;
}

interface Role {
  createdAt: string;
  description: Nullable<string>;
  id: string;
  name: string;
  permissions: Permission[];
  updatedAt: string;
}

interface Permission {
  action: Nullable<string>;
  category: PermissionCategory;
  code: string;
  createdAt: string;
  description: Nullable<string>;
  id: string;
  isSystem: boolean;
  module: Nullable<string>;
  updatedAt: string;
}

type AuthMeRole = Role;
type AuthMePermission = Permission;

type RoleResponse = ApiResponse<AuthMeRole>;
type RolesResponse = Pagination<AuthMeRole>;

type PermissionResponse = ApiResponse<AuthMePermission>;
type PermissionsResponse = Pagination<AuthMePermission>;
