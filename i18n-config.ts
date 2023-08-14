export const i18n = {
  defaultLocale: 'pt-BR',
  locales: ['pt-BR', 'en-US', 'es-ES'],
} as const;

export const languages = new Map<string, string>([
  ['pt-BR', 'Português (Brasil)'],
  ['en-US', 'English (United States)'],
  ['es-ES', 'Español (España)']
]);

export type Locale = (typeof i18n)['locales'][number];
