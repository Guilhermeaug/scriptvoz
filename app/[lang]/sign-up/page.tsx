import SignUpForm from '@/components/SignUpForm';
import Provider from '@/contexts/Provider';
import { getPageData } from '@/lib/page_data';
import { SignUpForm as SignUpFormType } from '@/types/form_types';

export default async function RegisterPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { data: formData }: SignUpFormType = await getPageData({
    path: 'sign-up',
    locale: lang,
  });

  return (
    <Provider color='standard'>
      <SignUpForm formData={formData} />
    </Provider>
  );
}
