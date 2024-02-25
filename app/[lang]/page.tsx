import Markdown from '@/components/Markdown';
import { authOptions } from '@/lib/auth';
import { getPageData } from '@/lib/page_data';
import { HomePage } from '@/types/page_types';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import InformationBox from '@/components/InformationBox';
import Logo from '@/public/cerebro-branco.png';
import CEFETMG from '@/public/cefet.png';
import UFMG from '@/public/logo-medicina.png';

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
      <header className='grid justify-items-center md:grid-cols-3 bg-standard p-1'>
        <div className='md:col-span-2 flex items-center justify-center gap-2'>
          <Image src={Logo} alt='Cérebro humano' className='hidden md:block max-w-full' />
          <h1 className='text-center text-5xl md:text-6xl text-white'>Script Voz</h1>
        </div>
        <div className='flex items-center justify-end pr-4 gap-4'>
          <Image src={UFMG} alt={'Logo da UFMG'} className='w-28 md:w-48' />
          <Image src={CEFETMG} alt={'Logo do CEFETMG'} className='w-16 md:w-28' />
        </div>
      </header>
      <main className='m-auto max-w-screen-md p-2'>
        <InformationBox title={pageAttributes.title} color={'diagnostic'}>
          <article className='p-4'>
            <Markdown className='prose lg:prose-xl'>
              {pageAttributes.front_text}
            </Markdown>
            <Markdown className='prose lg:prose-xl'>
              {pageAttributes.call_text}
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
      {/* <footer className={'flex items-center justify-center'}>
       
      </footer> */}
    </>
  );
}
