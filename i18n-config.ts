export const i18n = {
  defaultLocale: 'pt-BR',
  locales: ['pt-BR', 'en'],
} as const;

export const languages = new Map<string, string>([
  ['pt-BR', 'Português (Brasil)'],
  ['en', 'English'],
]);

export type Locale = (typeof i18n)['locales'][number];
