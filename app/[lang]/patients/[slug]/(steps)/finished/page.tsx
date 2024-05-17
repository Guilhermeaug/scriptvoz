import BlocksRendererClient from '@/components/BlocksRendererClient';
import InformationBox from '@/components/InformationBox';
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
    <>
      <div className='container flex h-screen flex-col items-center justify-center'>
        <header className='text-center text-3xl'>
          <h1>{pageAttributes.message}</h1>
        </header>
        <div className='flex flex-col items-center space-y-8'>
          <InformationBox className='border-none'>
            <BlocksRendererClient content={pageAttributes.summary} />
          </InformationBox>
          <Link href={navigateTo(lang, '')}>
            <button className='btn btn-primary'>
              {pageAttributes.button_text}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
