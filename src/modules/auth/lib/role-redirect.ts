export type RoleRedirectPath =
  | '/courses'
  | '/lesson-sessions'
  | '/lessons'
  | '/settings';

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
  SUPER_ADMIN: '/settings',
  ADMIN: '/courses',
  MAINTAINER: '/courses',
  TEACHER: '/lesson-sessions',
  SUPPORT_TEACHER: '/lesson-sessions',
  STUDENT: '/lessons',
  PARENT: '/settings',
  GUARDIAN: '/settings'
};

export const getPrimaryUserRole = (user?: Pick<User, 'roles'> | null): UserRole => {
  const roles = user?.roles?.map((role) => role.name) ?? [];

  return ROLE_PRIORITY.find((role) => roles.includes(role)) ?? 'STUDENT';
};

export const getDefaultRouteByUserRole = (user?: Pick<User, 'roles'> | null): RoleRedirectPath => {
  return ROLE_DEFAULT_ROUTE[getPrimaryUserRole(user)];
};
