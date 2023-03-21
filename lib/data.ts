import 'server-only';

export async function getData({ path }: { path: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`;
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
