import type { HAS_ACCESS } from '@/modules/auth/permissoin/constants';

import { useAuth } from '@/modules/auth';
import { hasAccessMap } from '@/modules/auth/permissoin/constants';

export const usePermission = () => {
  const { user } = useAuth();

  const hasRole = (roles: UserRole | UserRole[], checkUser: UserRole = user.role): boolean => {
    if (Array.isArray(roles)) return roles.includes(checkUser);

    return user.role === roles;
  };

  const hasAccessTo = (key: HAS_ACCESS, userRole: UserRole = user.role) => {
    return hasAccessMap[key].includes(userRole);
  };

  return { hasRole, hasAccessTo };
};
