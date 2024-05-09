import Markdown from '@/components/Markdown';
import { useAuth } from '@/lib/auth';
import { getPageData } from '@/lib/page_data';
import Link from 'next/link';

import { HomePage as HomePageType } from '@/types/page_types';

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: HomePageType = await getPageData({
    path: 'home-page',
    locale: lang,
  });

  const session = await useAuth();

  return (
    <div className='container mx-auto max-w-screen-md space-y-4 p-4 md:pt-8'>
      <h1 className='text-4xl font-bold text-accent'>{pageAttributes.title}</h1>
      <Markdown>{pageAttributes.front_text}</Markdown>
      <div className='mt-2 flex justify-end gap-2'>
        {session ? (
          <>
            <Link href='patients' locale={lang}>
              <button className='btn btn-primary btn-lg'>
                {pageAttributes.start_button_text}
              </button>
            </Link>
          </>
        ) : (
          <Link href='sign-in' locale={lang}>
            <button className='btn btn-secondary btn-lg'>
              {pageAttributes.login_button_text}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
