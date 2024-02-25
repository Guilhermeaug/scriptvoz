export async function getPatients({ locale }: { locale: string }) {
  let endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/patients?locale=${locale}`;

  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    cache: 'no-cache',
    next: {
      tags: ['patients'],
    },
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('Could not fetch patients data.');
  }

  return res.json();
}

export async function getPatient({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/slugify/slugs/patient/${slug}?locale=${locale}&populate=deep`;
  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    next: {
      tags: ['patients'],
    },
  });
  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('Could not fetch patients data.');
  }

  return res.json();
}
