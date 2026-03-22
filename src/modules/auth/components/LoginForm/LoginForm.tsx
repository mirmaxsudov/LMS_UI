import { useLingui } from '@lingui/react/macro';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import Cookies from 'js-cookie';

import type { LoginFormSchema } from '@/modules/auth/components/LoginForm/constants.ts';

import { loginFormSchema } from '@/modules/auth/components/LoginForm/constants.ts';
import { postLogin } from '@/shared/api';
import { COOKIES } from '@/shared/constants';
import { Button } from '@/shared/ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card.tsx';
import { useAppForm } from '@/shared/ui/form/hooks.ts';

export const LoginForm = () => {
  const { t } = useLingui();
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

  const router = useRouter();

  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({
      data: {
        data: { accessToken }
      }
    }) => {
      Cookies.set(COOKIES.ACCESS_TOKEN, accessToken, { expires: 7 });
      router.navigate({ to: '/settings' });
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t`Login to your account`}</CardTitle>
        <CardDescription>{t`Enter your phone number below to login to your account`}</CardDescription>
      </CardHeader>
      <CardContent>
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
              <Button className='mt-2' type='submit' loading={postLoginMutation.isPending}>
                {t`Login`}
              </Button>
            </div>
          </form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
};
