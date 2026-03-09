import Cookies from 'js-cookie';

import { COOKIES } from '@/shared/constants';
import { SOURCE_LOCALE } from '@/shared/i18n/config.ts';

export const getLocale = () => {
  return Cookies.get(COOKIES.LOCALE) || SOURCE_LOCALE;
};
