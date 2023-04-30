import 'server-only';

interface Request {
  locale: string;
  path: string;
  query: string;
}

export async function getPatientStep({ query, locale, path }: Request) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/patients/${query}/${path}?locale=${locale}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    cache: 'no-cache',
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('Could not fetch patient data.');
  }

  return res.json();
}

export async function getPageData({
  path,
  locale,
}: {
  path: string;
  locale: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${path}?locale=${locale}&populate=deep`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    cache: 'no-cache',
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the page data.');
  }

  return res.json();
}
