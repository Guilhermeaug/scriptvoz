import BlocksRendererClient from '@/components/BlocksRendererClient';
import { getPageData } from '@/lib/page_data';
import { getPatient } from '@/lib/patients';
import { EndScreenPage as EndScreenPageAttributes } from '@/types/page_types';
import { Patient } from '@/types/patients_types';
import ResetButton from './components/ResetButton';

interface Props {
  params: { lang: string; slug: string };
  searchParams: { slug: string };
}

export default async function EndScreenPage({
  params: { lang },
  searchParams: { slug },
}: Props) {
  const {
    data: { id },
  }: Patient = await getPatient({
    locale: lang,
    slug,
  });

  const {
    data: { attributes: pageAttributes },
  }: EndScreenPageAttributes = await getPageData({
    path: 'end-screen',
    locale: lang,
  });

  return (
    <div className='flex min-h-[calc(100vh-7rem)] flex-col place-items-center items-center justify-center gap-6 p-4'>
      <header className='text-center text-3xl'>
        <h1>{pageAttributes.message}</h1>
      </header>
      <BlocksRendererClient content={pageAttributes.summary} />
      <ResetButton
        patientId={id}
        lang={lang}
        text={pageAttributes.button_text}
      />
    </div>
  );
}
