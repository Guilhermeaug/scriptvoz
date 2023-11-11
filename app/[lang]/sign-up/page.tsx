// @ts-nocheck

import SignUpForm from '@/components/SignUpForm';
import { getPageData } from '@/lib/page_data';
import { SignUpFormModified, SignUpFormDefault as SignUpFormType } from '@/types/form_types';
import Header from '@/components/Header';

function fixInput(formData: SignUpFormType) {
  const copy = JSON.parse(JSON.stringify(formData)) as SignUpFormType;

  copy.data.attributes.commom = copy.data.attributes.commom.reduce(
    (acc, field) => {
      acc[field.name] = field;
      return acc;
    },
    {}
  );
  copy.data.attributes.teacherFields = copy.data.attributes.teacherFields.reduce(
    (acc, field) => {
      acc[field.name] = field;
      return acc;
    },
    {}
  );
  copy.data.attributes.studentFields = copy.data.attributes.studentFields.reduce(
    (acc, field) => {
      acc[field.name] = field;
      return acc;
    },
    {}
  );
  copy.data.attributes.professional = copy.data.attributes.professional.reduce(
    (acc, field) => {
      acc[field.name] = field;
      return acc;
    },
    {}
  );

  return copy as SignUpFormModified;
}

export default async function RegisterPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const formData: SignUpFormType = await getPageData({
    path: 'sign-up',
    locale: lang,
  });

  const form = fixInput(formData);

  return (
    <>
      <Header color={'evaluation'} />
      <SignUpForm formData={form} />
    </>
  );
}
