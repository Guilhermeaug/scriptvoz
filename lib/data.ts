import { Locale } from '@/types/home_types';
import 'server-only';

export async function getData({
  path,
  locale,
}: {
  path: string;
  locale: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${path}?populate=deep&locale=${locale}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    cache: 'no-cache',
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the data.');
  }

  return res.json();
}

export async function getAvailableLocales(): Promise<Locale[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/i18n/locales`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    cache: 'no-cache',
  });

  return res.json();
}
