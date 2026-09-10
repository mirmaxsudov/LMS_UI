export type RoleRedirectPath =
  | '/admin/dashboard'
  | '/parent/dashboard'
  | '/student/dashboard'
  | '/teacher/dashboard';

const ROLE_PRIORITY: UserRole[] = [
  'SUPER_ADMIN',
  'ADMIN',
  'MAINTAINER',
  'TEACHER',
  'SUPPORT_TEACHER',
  'STUDENT',
  'PARENT',
  'GUARDIAN'
];

export const ROLE_DEFAULT_ROUTE: Record<UserRole, RoleRedirectPath> = {
  SUPER_ADMIN: '/admin/dashboard',
  ADMIN: '/admin/dashboard',
  MAINTAINER: '/admin/dashboard',
  TEACHER: '/teacher/dashboard',
  SUPPORT_TEACHER: '/teacher/dashboard',
  STUDENT: '/student/dashboard',
  PARENT: '/parent/dashboard',
  GUARDIAN: '/parent/dashboard'
};

export const getPrimaryUserRole = (user?: Pick<User, 'roles'> | null): UserRole => {
  const roles = user?.roles?.map((role) => role.name) ?? [];

  return ROLE_PRIORITY.find((role) => roles.includes(role)) ?? 'STUDENT';
};

export const getDefaultRouteByUserRole = (user?: Pick<User, 'roles'> | null): RoleRedirectPath => {
  return ROLE_DEFAULT_ROUTE[getPrimaryUserRole(user)];
};
