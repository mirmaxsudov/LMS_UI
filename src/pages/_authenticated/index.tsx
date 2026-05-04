import type { AxiosResponse } from 'axios';

import { createFileRoute, redirect } from '@tanstack/react-router';

import { AUTH_QUERY_KEYS, getDefaultRouteByUserRole } from '@/modules/auth';

export const Route = createFileRoute('/_authenticated/')({
  loader: async ({ context: { queryClient } }) => {
    const key = AUTH_QUERY_KEYS.me;
    const res = queryClient.getQueryData<AxiosResponse<User>>([key]);
    const user = res?.data;

    if (!user) throw redirect({ to: '/login' });
    throw redirect({ to: getDefaultRouteByUserRole(user) });
  }
});
