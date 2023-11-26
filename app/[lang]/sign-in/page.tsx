import SignInForm from '@/components/SignInForm';
import { getPageData } from '@/lib/page_data';
import { SignInPage } from '@/types/page_types';

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
      <SignInForm lang={lang} pageAttributes={pageAttributes} />
    </>
  );
}
