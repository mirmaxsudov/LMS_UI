export type RoleRedirectPath =
  | '/admin/courses'
  | '/admin/lesson-sessions'
  | '/admin/lessons'
  | '/admin/settings';

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
  SUPER_ADMIN: '/admin/settings',
  ADMIN: '/admin/courses',
  MAINTAINER: '/admin/courses',
  TEACHER: '/admin/lesson-sessions',
  SUPPORT_TEACHER: '/admin/lesson-sessions',
  STUDENT: '/admin/lessons',
  PARENT: '/admin/settings',
  GUARDIAN: '/admin/settings'
};

export const getPrimaryUserRole = (user?: Pick<User, 'roles'> | null): UserRole => {
  const roles = user?.roles?.map((role) => role.name) ?? [];

  return ROLE_PRIORITY.find((role) => roles.includes(role)) ?? 'STUDENT';
};

export const getDefaultRouteByUserRole = (user?: Pick<User, 'roles'> | null): RoleRedirectPath => {
  return ROLE_DEFAULT_ROUTE[getPrimaryUserRole(user)];
};
