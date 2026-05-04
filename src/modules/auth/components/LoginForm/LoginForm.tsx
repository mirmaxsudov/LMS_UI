import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import Cookies from 'js-cookie';
import { ArrowRightIcon, ShieldCheckIcon } from 'lucide-react';

import type { LoginFormSchema } from '@/modules/auth/components/LoginForm/constants.ts';

import { loginFormSchema } from '@/modules/auth/components/LoginForm/constants.ts';
import { getAuthMeQueryOptions, getDefaultRouteByUserRole } from '@/modules/auth';
import { postLogin } from '@/shared/api';
import { COOKIES } from '@/shared/constants';
import { Button } from '@/shared/ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card.tsx';
import { useAppForm } from '@/shared/ui/form/hooks.ts';

export const LoginForm = () => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useAppForm({
    validators: { onChange: loginFormSchema() },
    defaultValues: {
      username: '',
      password: ''
    } satisfies LoginFormSchema as LoginFormSchema,
    onSubmit: ({ value }) => {
      postLoginMutation.mutate({ data: value });
    }
  });

  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async ({
      data: {
        data: { accessToken }
      }
    }) => {
      Cookies.set(COOKIES.ACCESS_TOKEN, accessToken, { expires: 7 });
      const authMeResponse = await queryClient.fetchQuery(getAuthMeQueryOptions());
      await router.navigate({ to: getDefaultRouteByUserRole(authMeResponse.data) });
    }
  });

  return (
    <Card className='w-full gap-7 rounded-lg border-border/70 bg-card/95 px-1 py-7 shadow-xl shadow-primary/5 backdrop-blur'>
      <CardHeader className='gap-4 px-7'>
        <div className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-md'>
          <ShieldCheckIcon className='size-6' />
        </div>
        <div className='space-y-2'>
          <CardTitle className='text-2xl leading-tight'>{t`Welcome back`}</CardTitle>
          <CardDescription className='text-base leading-6'>
            {t`Sign in to continue managing courses, lessons, and learner progress.`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='px-7'>
        <form.AppForm>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div className='grid gap-3'>
              <form.AppField name='username'>
                {(field) => <field.Input isRequired label={t`Username`} />}
              </form.AppField>
              <form.AppField name='password'>
                {(field) => (
                  <field.PasswordInput isRequired label={t`Password`} placeholder='********' />
                )}
              </form.AppField>
              <Button className='mt-3 h-11 w-full text-base' type='submit' loading={postLoginMutation.isPending}>
                {t`Login`}
                {!postLoginMutation.isPending && <ArrowRightIcon className='size-5' />}
              </Button>
            </div>
          </form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
};
