import BlocksRendererClient from '@/components/BlocksRendererClient';
import { getPageData } from '@/lib/page_data';
import { EndScreenPage as EndScreenPageAttributes } from '@/types/page_types';
import { navigateTo } from '@/util/navigateTo';
import Link from 'next/link';

interface Props {
  params: { lang: string; slug: string };
}

export default async function EndScreenPage({ params: { lang, slug } }: Props) {
  const {
    data: { attributes: pageAttributes },
  }: EndScreenPageAttributes = await getPageData({
    path: 'end-screen',
    locale: lang,
  });

  return (
    <div className='flex min-h-[calc(100vh-7rem)] flex-col place-items-center items-center justify-center gap-6 p-4'>
      <header className='text-center text-3xl'>
        <h1>{pageAttributes.message}</h1>
      </header>
      <BlocksRendererClient content={pageAttributes.summary} />
      <Link href={navigateTo(lang, '')}>
        <button className='btn btn-primary btn-lg'>
          {pageAttributes.button_text}
        </button>
      </Link>
    </div>
  );
}
