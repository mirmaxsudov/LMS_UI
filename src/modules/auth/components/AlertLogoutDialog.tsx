import type React from 'react';

import { useLingui } from '@lingui/react/macro';
import { useRouter } from '@tanstack/react-router';
import Cookies from 'js-cookie';

import { COOKIES } from '@/shared/constants';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/shared/ui/alert-dialog';

interface Props {
  children: React.ReactNode;
}

export const AlertLogoutDialog = ({ children }: Props) => {
  const { t } = useLingui();
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove(COOKIES.ACCESS_TOKEN);
    void router.navigate({ to: '/login' });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t`Are you sure to logout?`}</AlertDialogTitle>
          <AlertDialogDescription>
            Joriy seans yakunlanadi va siz kirish sahifasiga qaytasiz.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t`Cancel`}</AlertDialogCancel>
          <AlertDialogAction
            variant='destructive'
            onClick={onLogout}
          >{t`Logout`}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
