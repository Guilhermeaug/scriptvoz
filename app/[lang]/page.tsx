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
      <header className='navbar rounded-lg bg-neutral text-neutral-content'>
        <div className='flex-1'>
          <Link className='btn-ghost btn text-xl normal-case' href='/'>
            ScriptVoz
          </Link>
        </div>
        <div className={'navbar-end space-x-4 mx-4'}>
          {session && <SignOutButton />}
          <LocaleSwitcher />
        </div>
      </header>
      <main className='mt-3 space-y-8'>
        {session && (
          <section>
            <h2 className={'text-center text-xl font-medium'}>
              Seja bem vindo de volta, {session!.user.name}
            </h2>
          </section>
        )}
        <section className='card bg-[#004172] shadow-xl lg:card-side'>
          <Image
            src='/raciocinio_clinico.png'
            alt='Cérebro humano'
            width={325}
            height={325}
            className='self-center'
          />
          <article className='card-body bg-base-100'>
            <h2 className='text-6xl font-bold'>Script Voz</h2>
            <Markdown className='prose prose-xl'>
              {pageAttributes.front_text}
            </Markdown>
            <Markdown className='prose prose-xl'>
              {pageAttributes.call_text}
            </Markdown>
            <div className='card-actions justify-end'>
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
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
