import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import Cookies from 'js-cookie';

import { getAuthMeQueryOptions } from '@/modules/auth';
import { COOKIES } from '@/shared/constants';

export const useAuth = () => {
  const getUsersMeSuspenseQuery = useSuspenseQuery(getAuthMeQueryOptions());
  const router = useRouter();
  const queryClient = useQueryClient();

  const onLogout = () => {
    Cookies.remove(COOKIES.ACCESS_TOKEN);
    router.navigate({ to: '/login' }).then(() => queryClient.clear());
  };

  return {
    user: {
      ...getUsersMeSuspenseQuery.data.data,
      role: 'superadmin' as UserRole
    },
    onLogout
  };
};
