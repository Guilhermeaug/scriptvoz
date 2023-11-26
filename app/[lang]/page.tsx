import Markdown from '@/components/Markdown';
import { authOptions } from '@/lib/auth';
import { getPageData } from '@/lib/page_data';
import { HomePage } from '@/types/home_types';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import InformationBox from '@/components/InformationBox';
import Logo from '@/public/cerebro-branco.png';
import CEFETMG from '@/public/logo_cefet.svg';
import UFMG from '@/public/logo_ufmg.svg';

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: HomePage = await getPageData({
    path: 'home-page',
    locale: lang,
  });

  const session = await getServerSession(authOptions);

  return (
    <>
      <header className='flex items-center justify-around bg-standard md:h-36 md:justify-center md:gap-8'>
        <Image src={Logo} alt='Cérebro humano' className='w-28 bg-no-repeat' />
        <h1 className='text-5xl text-white'>Script Voz</h1>
      </header>
      <main className='m-auto max-w-screen-md p-2'>
        <InformationBox title={'O que é'} color={'diagnostic'}>
          <article className='p-4'>
            <Markdown className='prose lg:prose-xl'>
              {pageAttributes.front_text}
            </Markdown>
            <div className='mt-2 flex justify-end gap-2'>
              {session ? (
                <>
                  {session.user.isTeacher && (
                    <Link href={'groups'} locale={lang}>
                      <button className='btn btn-primary text-white'>
                        TURMAS
                      </button>
                    </Link>
                  )}
                  <Link href={'patients'} locale={lang}>
                    <button className='btn btn-primary text-white'>
                      {pageAttributes.button_text}
                    </button>
                  </Link>
                </>
              ) : (
                <Link href={'sign-in'} locale={lang}>
                  <button className='btn btn-primary text-white'>
                    Fazer login
                  </button>
                </Link>
              )}
            </div>
          </article>
        </InformationBox>
      </main>
      <footer className={'flex items-center justify-center'}>
        <Image src={UFMG} alt={'Logo da UFMG'} className='w-20 md:w-32' />
        <Image src={CEFETMG} alt={'Logo do CEFETMG'} className='w-20 md:w-32' />
      </footer>
    </>
  );
}
