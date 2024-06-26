import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { getPageData } from '@/lib/page_data';
import ScriptVozImage from '@/public/faviconImage.png';
import BackgroundImage from '@/public/login-background.jpg';
import { SignUpPage } from '@/types/page_types';
import { SignUpFields } from '@/types/sign_up_types';
import Image from 'next/image';

export default async function RegisterPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const formData: SignUpFields = await getPageData({
    path: 'sign-up',
    locale: lang,
  });
  const {
    data: { attributes: pageAttributes },
  }: SignUpPage = await getPageData({
    path: 'sign-up-page',
    locale: lang,
  });

  return (
    <div className='mx-auto lg:grid lg:min-h-[calc(100vh-7rem)] lg:grid-cols-2 lg:gap-6'>
      <div
        className='hidden lg:mx-auto lg:block lg:h-full lg:w-full lg:space-y-3 lg:p-7'
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className='flex items-center gap-3 text-xl font-semibold'>
          <Image src={ScriptVozImage} alt='' />
          <p>{pageAttributes.scriptvoz}</p>
        </div>
        <p className='text-3xl'>{pageAttributes.cta1}</p>
        <p className='text-2xl'>{pageAttributes.cta2}</p>
        <p className='text-2xl'>{pageAttributes.cta3}</p>
      </div>
      <div className='mx-auto mt-3 w-full space-y-3 p-3 md:max-w-[520px]'>
        <div className='flex items-center gap-3 text-xl font-semibold lg:hidden'>
          <Image src={ScriptVozImage} alt='' />
          <p>{pageAttributes.scriptvoz}</p>
        </div>
        <SignUpForm
          lang={lang}
          formData={formData}
          pageAttributes={pageAttributes}
        />
      </div>
    </div>
  );
}
