import { useLingui } from '@lingui/react/macro';

import { useAuth } from '@/modules/auth';
import { PageContent, PageHeader } from '@/shared/ui/page';

import { ProfileSettingsForm } from './ProfileSettingsForm';
import { ProfileSummary } from './ProfileSummary';

export const SettingsPage = () => {
  const { t } = useLingui();
  const { user } = useAuth();

  return (
    <>
      <PageHeader />
      <PageContent className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-semibold tracking-normal'>{t`Settings`}</h1>
          <p className='text-muted-foreground text-base'>
            {t`Manage your personal information and account settings.`}
          </p>
        </div>
        <div className='grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]'>
          <ProfileSummary user={user} />
          <ProfileSettingsForm user={user} />
        </div>
      </PageContent>
    </>
  );
};
