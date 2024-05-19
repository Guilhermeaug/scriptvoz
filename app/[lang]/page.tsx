import Markdown from '@/components/Markdown';
import { useAuth } from '@/lib/auth';
import { getPageData } from '@/lib/page_data';
import Image from 'next/image';
import Link from 'next/link';

import CEFETMG from '@/public/Logo_CEFET-MG-Colorida.png';
import UFMG from '@/public/logo_ufmg.svg';

import { HomePage as HomePageType } from '@/types/page_types';
import { navigateTo } from '@/util/navigateTo';

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
      <div className='mt-2 flex flex-col flex-wrap items-end justify-end gap-2 md:flex-row'>
        <Link locale={lang} href={navigateTo(lang, 'manual')}>
          <button className='btn btn-ghost w-full justify-start rounded-none uppercase'>
            {pageAttributes.manual}
          </button>
        </Link>
        <Link locale={lang} href={navigateTo(lang, 'bibliography')}>
          <button className='btn btn-ghost w-full justify-start rounded-none uppercase'>
            {pageAttributes.bibliography}
          </button>
        </Link>
        <Link href={navigateTo(lang, 'about-us')} className='link-hover link'>
          <button className='btn btn-ghost w-full justify-start rounded-none uppercase'>
            {pageAttributes.about_us}
          </button>
        </Link>
        <Link
          href={navigateTo(lang, 'about-us#authors')}
          className='link-hover link'
        >
          <button className='btn btn-ghost w-full justify-start rounded-none uppercase'>
            {pageAttributes.contact_us}
          </button>
        </Link>
      </div>
      <div className='grid flex-grow place-items-center gap-4 bg-primary p-4'>
        <Markdown className='text-white'>{pageAttributes.front_text}</Markdown>
        <div className='flex justify-end'>
          {session ? (
            <>
              <Link href={navigateTo(lang, 'patients')}>
                <button className='btn btn-lg w-64'>
                  {pageAttributes.start_button_text}
                </button>
              </Link>
            </>
          ) : (
            <Link href={navigateTo(lang, 'sign-in')}>
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
            alt=''
            width='0'
            height='0'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='h-auto w-20 max-w-full flex-shrink-0 flex-grow-0 lg:w-32'
          />
          <Image
            src={CEFETMG}
            alt=''
            width='0'
            height='0'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='h-auto w-20 max-w-full flex-shrink-0 flex-grow-0 lg:w-32'
          />
        </div>
      </div>
    </div>
  );
}
