import Header from '@/components/Header';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { getPageData } from '@/lib/page_data';
import { SignUpPage } from '@/types/page_types';
import { SignUpFields } from '@/types/sign_up_types';

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
    path: 'sign-in-page',
    locale: lang,
  });

  return (
    <>
      <Header color={'evaluation'} />
      <main className='mx-auto mt-3 flex max-w-screen-md flex-col items-center space-y-4 p-3 md:pt-16'>
        <SignUpForm formData={formData} pageAttributes={pageAttributes} />
      </main>
    </>
  );
}
