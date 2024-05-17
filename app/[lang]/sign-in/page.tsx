import Modal from '@/components/Modal';
import SignInForm from '@/components/SignInForm';
import { getPageData } from '@/lib/page_data';
import ScriptVozImage from '@/public/faviconImage.png';
import LoginImage from '@/public/login-background.jpg';
import { SignInPage } from '@/types/page_types';
import Image from 'next/image';
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
      <div className='mx-auto lg:grid lg:h-screen lg:grid-cols-2 lg:gap-6'>
        <div
          className='hidden lg:mx-auto lg:block lg:h-full lg:w-full lg:space-y-3 lg:p-7'
          style={{
            backgroundImage: `url(${LoginImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='flex items-center gap-3 text-xl font-semibold'>
            <Image src={ScriptVozImage} alt='' />
            <p>{pageAttributes.scriptvoz}</p>
          </div>
          <p className='text-3xl'>{pageAttributes.cta1}</p>
          <p className='text-2xl'>{pageAttributes.cta2}</p>
        </div>
        <div className='mx-auto mt-3 w-full space-y-3 p-3 md:max-w-[520px]'>
          <div className='flex items-center gap-3 text-xl font-semibold lg:hidden'>
            <Image src={ScriptVozImage} alt='' />
            <p>{pageAttributes.scriptvoz}</p>
          </div>
          <SignInForm lang={lang} pageAttributes={pageAttributes} />
          <div className='grid auto-cols-fr text-center'>
            <span>{pageAttributes.call_text}</span>
            <Link href={`sign-up`} locale={lang} className={'text-primary'}>
              {pageAttributes.sign_in}
            </Link>
            <Modal />
          </div>
        </div>
      </div>
    </>
  );
}
