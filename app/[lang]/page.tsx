import Markdown from '@/components/Markdown';
import { useAuth } from '@/lib/auth';
import { getPageData } from '@/lib/page_data';
import Image from 'next/image';
import Link from 'next/link';

import CEFETMG from '@/public/Logo_CEFET-MG-Colorida.png';
import UFMG from '@/public/logo_ufmg.svg';

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
    <div className='mx-auto space-y-6'>
      <div className='mt-2 flex justify-end gap-2'>
        <Link locale={lang} href='manual'>
          <button className='btn btn-ghost w-full justify-start rounded-none uppercase'>
            Manual do Software
          </button>
        </Link>
        <Link lang={lang} href='bibliography'>
          <button className='btn btn-ghost w-full justify-start rounded-none uppercase'>
            Bibliografia do Trabalho
          </button>
        </Link>
      </div>
      <div className='grid flex-grow place-items-center gap-4 bg-primary p-4'>
        <Markdown className='text-white'>{pageAttributes.front_text}</Markdown>
        <div className='flex justify-end'>
          {session ? (
            <>
              <Link href='patients' locale={lang}>
                <button className='btn btn-lg w-64'>
                  {pageAttributes.start_button_text}
                </button>
              </Link>
            </>
          ) : (
            <Link href='sign-in' locale={lang}>
              <button className='btn btn-lg w-64'>
                {pageAttributes.login_button_text}
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className='lg:absolute lg:bottom-0 lg:right-0 lg:px-4 lg:py-2'>
        <div className='relative flex justify-end gap-6'>
          <Image
            src={UFMG}
            alt={'Logo da UFMG'}
            width='0'
            height='0'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='h-auto w-20 max-w-full flex-shrink-0 flex-grow-0 cursor-pointer lg:w-32'
          />
          <Image
            src={CEFETMG}
            alt={'Logo do CEFETMG'}
            width='0'
            height='0'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='h-auto w-20 max-w-full flex-shrink-0 flex-grow-0 cursor-pointer lg:w-32'
          />
        </div>
      </div>
    </div>
  );
}
