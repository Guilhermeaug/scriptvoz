import Markdown from '@/components/Markdown';
import { useAuth } from '@/lib/auth';
import { getPageData } from '@/lib/page_data';
import Image from 'next/image';
import Link from 'next/link';

import InformationBox from '@/components/InformationBox';
import CEFETMG from '@/public/cefet.png';
import Logo from '@/public/cerebro-branco.png';
import UFMG from '@/public/logo-medicina.png';
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

  const buttonStyle = 'btn btn-primary text-white';

  return (
    <>
      <header className='bg-standard p-1 md:grid md:grid-cols-3'>
        <div className='flex items-center justify-center gap-2 md:col-span-2'>
          <Image
            src={Logo}
            alt='Cérebro humano'
            className='hidden max-w-full md:block'
          />
          <h1 className='text-center text-5xl text-white md:text-6xl'>
            Script Voz
          </h1>
        </div>
        <div className='flex items-center justify-end gap-4 pr-4'>
          <Image src={UFMG} alt={'Logo da UFMG'} className='w-28 md:w-48' />
          <Image
            src={CEFETMG}
            alt={'Logo do CEFETMG'}
            className='w-16 md:w-28'
          />
        </div>
      </header>
      <main className='mx-auto max-w-screen-md p-3 md:pt-8'>
        <InformationBox title={pageAttributes.title} color='diagnostic'>
          <div className='p-4'>
            <Markdown>{pageAttributes.front_text}</Markdown>
            <div className='mt-2 flex justify-end gap-2'>
              {session ? (
                <>
                  {session.user.isTeacher && (
                    <Link href='groups' locale={lang}>
                      <button className={buttonStyle}>
                        {pageAttributes.groups_button_text}
                      </button>
                    </Link>
                  )}
                  <Link href='patients' locale={lang}>
                    <button className={buttonStyle}>
                      {pageAttributes.start_button_text}
                    </button>
                  </Link>
                </>
              ) : (
                <Link href='sign-in' locale={lang}>
                  <button className={buttonStyle}>
                    {pageAttributes.login_button_text}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </InformationBox>
      </main>
    </>
  );
}
