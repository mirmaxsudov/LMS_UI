import { useLingui } from '@lingui/react';
import { createFileRoute } from '@tanstack/react-router';

import { getPublicLocale, privacyCopy, PublicLegalPage } from '@/modules/landing';

const PrivacyPage = () => {
  const { i18n } = useLingui();
  const locale = getPublicLocale(i18n.locale);

  return <PublicLegalPage kind='privacy' document={privacyCopy[locale]} />;
};

export const Route = createFileRoute('/privacy/')({
  component: PrivacyPage
});
