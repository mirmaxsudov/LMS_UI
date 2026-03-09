import type { Locale } from '@/shared/i18n/config.ts';

export const localeLabelMap: Record<Locale, string> = {
  uz: "O'zbek",
  ru: 'Русский',
  en: 'English'
};

export const localeOptions = Object.entries(localeLabelMap).map(([key, value]) => ({
  value: key as Locale,
  label: value
}));
