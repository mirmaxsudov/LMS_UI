import Cookies from 'js-cookie';

import type { Locale } from '@/shared/i18n/config.ts';

import { COOKIES } from '@/shared/constants';
import { APP_LOCALES, SOURCE_LOCALE } from '@/shared/i18n/config.ts';
import { dynamicActivate } from '@/shared/i18n/dynamicActivate.ts';

export const initialI18nActivate = () => {
  const locale = (Cookies.get(COOKIES.LOCALE) || SOURCE_LOCALE) as Locale;

  if (APP_LOCALES.includes(locale)) {
    Cookies.set(COOKIES.LOCALE, locale, { expires: 365 });
  } else {
    Cookies.set(COOKIES.LOCALE, SOURCE_LOCALE, { expires: 365 });
  }

  dynamicActivate(locale);
};
