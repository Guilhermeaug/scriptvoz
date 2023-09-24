import LocaleSwitcher from '@/components/LocaleSwitcher';
import Markdown from '@/components/Markdown';
import { getPageData } from '@/lib/page_data';
import { HomePage } from '@/types/home_types';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SignOutButton from '@/components/SignOutButton';
import Footer from '@/components/Footer';
import Provider from '@/contexts/Provider';
import Header from '@/components/Header';

import Logo from '@/public/cerebro.png';
import CEFETMG from '@/public/logo_cefet.svg';
import UFMG from '@/public/logo_ufmg.svg';
import InformationBox from '@/components/InformationBox';

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
    <Provider color={'evaluation'}>
      <Header center={true} />
      <main className='container mx-auto p-3 mt-3 space-y-8 flex flex-col items-center'>
        <Image
          src={Logo}
          alt='Cérebro humano'
          width={200}
          className='self-center'
        />
        <InformationBox
          title={'Script VOZ'}
          color={'diagnostic'}
          className={'max-w-3xl'}
        >
          <article className='p-4'>
            <Markdown className='prose prose-xl'>
              {pageAttributes.front_text}
            </Markdown>
            <Markdown className='prose prose-xl'>
              {pageAttributes.call_text}
            </Markdown>
            <div className='flex justify-end mt-4 gap-2'>
              {session ? (
                <>
                  {session.user.isTeacher && (
                    <Link href={'groups'} locale={lang}>
                      <button className='btn-primary btn'>TURMAS</button>
                    </Link>
                  )}
                  <Link href={'patients'} locale={lang}>
                    <button className='btn-primary btn'>
                      {pageAttributes.button_text}
                    </button>
                  </Link>
                </>
              ) : (
                <Link href={'sign-in'} locale={lang}>
                  <button className='btn-primary btn'>Fazer login</button>
                </Link>
              )}
            </div>
          </article>
        </InformationBox>
        <div className={'flex gap-16'}>
          <Image src={UFMG} alt={'Logo da UFMG'} width={150} />
          <Image src={CEFETMG} alt={'Logo do CEFETMG'} width={150} />
        </div>
      </main>
    </Provider>
  );
}
