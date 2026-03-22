import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ShieldCheck, Sparkles, UserCircle2, UserRoundCog } from 'lucide-react';
import { useMemo } from 'react';

import { getAuthMeQueryOptions } from '@/modules/auth';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageContent, PageHeader, PageLoading } from '@/shared/ui/page';

const getDisplayName = (user: User) =>
  [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' ');

const getInitials = (user: User) =>
  [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join('').toUpperCase();

const SettingsPage = () => {
  const { data } = useQuery(getAuthMeQueryOptions());
  const user = data?.data;

  const roleNames = useMemo(
    () =>
      user?.roles
        ?.map((role) => role.name)
        .filter(Boolean)
        .map((name) => name.replaceAll('_', ' ')) ?? [],
    [user?.roles]
  );

  const permissionsCount = useMemo(() => {
    if (!user?.roles?.length) return 0;
    const uniquePermissions = new Set(
      user.roles.flatMap((role) => role.permissions?.map((permission) => permission.code) ?? [])
    );
    return uniquePermissions.size;
  }, [user?.roles]);

  const fullName = user ? getDisplayName(user) : 'Account user';
  const initials = user ? getInitials(user) : 'U';

  return (
    <>
      <PageHeader />
      <PageContent className='bg-background relative overflow-x-hidden'>
        <div className='pointer-events-none absolute inset-0 -z-10'>
          <div className='from-primary/12 via-primary/4 to-background absolute -top-36 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-br blur-3xl' />
          <div className='border-primary/20 absolute top-20 right-8 h-24 w-24 rounded-full border border-dashed' />
          <div className='border-primary/20 absolute bottom-20 left-8 h-28 w-28 rounded-full border border-dashed' />
        </div>

        <section className='mx-auto flex w-full max-w-6xl flex-col gap-6 pb-8'>
          <Card className='from-card to-card/60 overflow-hidden border-0 bg-gradient-to-br shadow-sm'>
            <CardContent className='p-0'>
              <div className='from-primary/90 to-chart-2/80 relative grid gap-6 bg-gradient-to-r p-6 text-white md:grid-cols-[auto,1fr,auto] md:items-center'>
                <div className='rounded-2xl bg-white/20 p-1 ring-1 ring-white/30 backdrop-blur'>
                  <Avatar className='size-20 rounded-xl'>
                    <AvatarImage alt={fullName} src={user?.profileImageUrl ?? ''} />
                    <AvatarFallback className='bg-white/30 text-2xl font-semibold'>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className='space-y-2'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <p className='text-2xl font-semibold tracking-tight'>{fullName}</p>
                    <Badge className='border-0 bg-white/20 text-white uppercase'>
                      {user?.status ?? 'ACTIVE'}
                    </Badge>
                  </div>
                  <p className='text-sm/6 text-white/90'>{user?.email ?? 'No email available'}</p>
                  <div className='text-xs text-white/80'>
                    {user?.phoneNumber ?? 'Phone number not added'}
                  </div>
                </div>
                <div className='grid gap-2 md:justify-items-end'>
                  <Button
                    className='text-primary bg-white hover:bg-white/90'
                    size='sm'
                    type='button'
                    variant='secondary'
                  >
                    <UserRoundCog />
                    Edit profile
                  </Button>
                  <Button
                    className='bg-white/20 text-white hover:bg-white/30'
                    size='sm'
                    type='button'
                    variant='ghost'
                  >
                    <ShieldCheck />
                    Security
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='grid gap-4 md:grid-cols-3'>
            <Card className='border-primary/20 bg-card/60 backdrop-blur'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <Sparkles className='text-primary size-4' />
                  Roles
                </CardTitle>
                <CardDescription>Assigned access groups</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                {roleNames.length ? (
                  roleNames.map((role) => (
                    <Badge key={role} className='mr-2 mb-2 uppercase' variant='secondary'>
                      {role}
                    </Badge>
                  ))
                ) : (
                  <p className='text-muted-foreground text-sm'>No roles found</p>
                )}
              </CardContent>
            </Card>

            <Card className='border-primary/20 bg-card/60 backdrop-blur'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <ShieldCheck className='text-primary size-4' />
                  Permissions
                </CardTitle>
                <CardDescription>Effective permission count</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-3xl leading-none font-semibold tracking-tight'>
                  {permissionsCount}
                </p>
                <p className='text-muted-foreground mt-2 text-sm'>
                  Unique permissions aggregated across all assigned roles.
                </p>
              </CardContent>
            </Card>

            <Card className='border-primary/20 bg-card/60 backdrop-blur'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <UserCircle2 className='text-primary size-4' />
                  Personal data
                </CardTitle>
                <CardDescription>Current account details</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2 text-sm'>
                <InfoRow label='Gender' value={user?.gender ?? 'Not set'} />
                <InfoRow label='Birth date' value={user?.birthDate ?? 'Not set'} />
                <InfoRow label='Status' value={user?.status ?? 'ACTIVE'} />
              </CardContent>
            </Card>
          </div>

          <Card className='border-primary/20 bg-card/70 backdrop-blur'>
            <CardHeader>
              <CardTitle>Account overview</CardTitle>
              <CardDescription>
                This page is connected to the backend and displays live data from `auth/me`.
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-3 md:grid-cols-2'>
              <InfoRow label='First name' value={user?.firstName ?? '-'} />
              <InfoRow label='Middle name' value={user?.middleName ?? '-'} />
              <InfoRow label='Last name' value={user?.lastName ?? '-'} />
              <InfoRow label='Email' value={user?.email ?? '-'} />
              <InfoRow label='Phone' value={user?.phoneNumber ?? '-'} />
              <InfoRow
                label='Profile image'
                value={user?.profileImageUrl ? 'Connected' : 'Not added'}
              />
            </CardContent>
          </Card>
        </section>
      </PageContent>
    </>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div
      className={cn(
        'bg-muted/45 flex items-center justify-between rounded-xl border border-transparent px-3 py-2',
        'hover:border-primary/20'
      )}
    >
      <span className='text-muted-foreground text-xs tracking-wide uppercase'>{label}</span>
      <span className='text-sm font-medium'>{value}</span>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
