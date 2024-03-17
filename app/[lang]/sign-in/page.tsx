import Header from '@/components/Header';
import Modal from '@/components/Modal';
import SignInForm from '@/components/SignInForm';
import { getPageData } from '@/lib/page_data';
import { SignInPage } from '@/types/page_types';
import Link from 'next/link';

export default async function LoginPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: SignInPage = await getPageData({
    path: 'sign-in-page',
    locale: lang,
  });

  return (
    <>
      <Header color={'evaluation'} />
      <main className='mx-auto max-w-screen-md space-y-4 p-3 md:pt-8'>
        <SignInForm lang={lang} pageAttributes={pageAttributes} />
        <section className={'text-center text-xl'}>
          <div>
            <span>{pageAttributes.call_text}</span>
            <Link href={`sign-up`} locale={lang} className={'text-primary'}>
              {' '}
              {pageAttributes.sign_in}
            </Link>
          </div>
          <Modal />
        </section>
      </main>
    </>
  );
}
