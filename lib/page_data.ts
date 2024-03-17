export async function getPageData({
  path,
  locale,
}: {
  path: string;
  locale: string;
}) {
  const url = `${process.env.STRAPI_URL}/api/${path}?locale=${locale}&populate=deep`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    cache: 'no-cache',
    next: {
      tags: ['page-data'],
    },
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the page data.');
  }

  return res.json();
}
