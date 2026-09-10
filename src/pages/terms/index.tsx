import { useLingui } from '@lingui/react';
import { createFileRoute } from '@tanstack/react-router';

import { getPublicLocale, PublicLegalPage, termsCopy } from '@/modules/landing';

const TermsPage = () => {
  const { i18n } = useLingui();
  const locale = getPublicLocale(i18n.locale);

  return <PublicLegalPage kind='terms' document={termsCopy[locale]} />;
};

export const Route = createFileRoute('/terms/')({
  component: TermsPage
});
