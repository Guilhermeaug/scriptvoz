import ResetPasswordForm from '@/components/ResetPasswordForm';
import { getPageData } from '@/lib/page_data';
import { ResetPasswordPage as ResetPasswordPageAttributes } from '@/types/page_types';

export default async function ResetPasswordPage({
  params: { lang },
  searchParams: { code },
}: {
  params: { lang: string };
  searchParams: { code: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: ResetPasswordPageAttributes = await getPageData({
    path: 'reset-password-page',
    locale: lang,
  });

  return (
    <div className='mx-auto flex max-w-screen-md flex-col items-center space-y-6 p-2 md:p-5 md:pt-16'>
      <h1 className='text-3xl text-primary'>{pageAttributes.title}</h1>
      <ResetPasswordForm code={code} pageAttributes={pageAttributes} />
    </div>
  );
}
