import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import Cookies from 'js-cookie';
import { ArrowRightIcon, FlaskConicalIcon, ShieldCheckIcon } from 'lucide-react';

import type { LoginFormSchema } from '@/modules/auth/components/LoginForm/constants';

import { getAuthMeQueryOptions, getDefaultRouteByUserRole } from '@/modules/auth';
import { loginFormSchema } from '@/modules/auth/components/LoginForm/constants';
import { postLogin } from '@/shared/api';
import { COOKIES } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { useAppForm } from '@/shared/ui/form/hooks';

export const LoginForm = () => {
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
      await router.navigate({ to: getDefaultRouteByUserRole(authMeResponse.data.data) });
    }
  });

  const openDemo = async (to: '/admin/dashboard' | '/student/dashboard' | '/teacher/dashboard') => {
    await router.navigate({ to });
  };

  return (
    <Card className='border-border/70 bg-card/95 shadow-primary/5 w-full gap-7 rounded-lg px-1 py-7 shadow-xl backdrop-blur'>
      <CardHeader className='gap-4 px-7'>
        <div className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-md'>
          <ShieldCheckIcon className='size-6' />
        </div>
        <div className='space-y-2'>
          <CardTitle className='font-[Georgia,serif] text-2xl leading-tight'>
            Tizimga kirish
          </CardTitle>
          <CardDescription className='text-base leading-6'>
            Kurslar, maslahatlar va o‘quv natijalarini boshqarish uchun ma’lumotlaringizni kiriting.
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
                {(field) => <field.Input isRequired label='Telefon yoki login' />}
              </form.AppField>
              <form.AppField name='password'>
                {(field) => <field.PasswordInput isRequired label='Parol' placeholder='********' />}
              </form.AppField>
              <Button
                className='mt-3 h-11 w-full text-base'
                type='submit'
                loading={postLoginMutation.isPending}
              >
                Kirish
                {!postLoginMutation.isPending && <ArrowRightIcon className='size-5' />}
              </Button>
              <div className='relative my-2 flex items-center gap-3'>
                <span className='bg-border h-px flex-1' />
                <span className='text-muted-foreground flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] uppercase'>
                  <FlaskConicalIcon className='size-3.5' /> Demo kirish
                </span>
                <span className='bg-border h-px flex-1' />
              </div>
              <div className='grid grid-cols-3 gap-2'>
                <Button
                  className='h-auto rounded-xl py-2.5 text-xs'
                  type='button'
                  variant='outline'
                  onClick={() => void openDemo('/student/dashboard')}
                >
                  Tinglovchi
                </Button>
                <Button
                  className='h-auto rounded-xl py-2.5 text-xs'
                  type='button'
                  variant='outline'
                  onClick={() => void openDemo('/teacher/dashboard')}
                >
                  Ekspert
                </Button>
                <Button
                  className='h-auto rounded-xl py-2.5 text-xs'
                  type='button'
                  variant='outline'
                  onClick={() => void openDemo('/admin/dashboard')}
                >
                  Admin
                </Button>
              </div>
              <p className='text-muted-foreground mt-2 text-center text-xs leading-5'>
                Davom etish orqali{' '}
                <Link
                  className='text-foreground font-medium underline underline-offset-4'
                  to='/terms'
                >
                  Foydalanish shartlari
                </Link>{' '}
                va{' '}
                <Link
                  className='text-foreground font-medium underline underline-offset-4'
                  to='/privacy'
                >
                  Maxfiylik siyosati
                </Link>
                ga rozilik bildirasiz.
              </p>
            </div>
          </form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
};
