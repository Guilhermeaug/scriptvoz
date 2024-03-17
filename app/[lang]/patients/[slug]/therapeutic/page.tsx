import ArrowNavigator from '@/components/ArrowNavigator';
import BlocksRendererClient from '@/components/BlocksRendererClient';
import BreadCrumb from '@/components/Breadcrumb';
import Header from '@/components/Header';
import InformationBox from '@/components/InformationBox';
import Questions from '@/components/Questions';
import { getPageData } from '@/lib/page_data';
import { getPatient } from '@/lib/patients';
import { TherapeuticPage } from '@/types/page_types';
import { Patient } from '@/types/patients_types';

export const metadata = {
  title: 'Decisão Terapéutica',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

interface TherapeuticStepProps {
  params: { lang: string; slug: string };
}

export default async function TherapeuticStep({
  params: { lang, slug },
}: TherapeuticStepProps) {
  const patientPromise: Promise<Patient> = getPatient({
    locale: lang,
    slug,
  });
  const pagePromise: Promise<TherapeuticPage> = getPageData({
    path: 'therapeutic-page',
    locale: lang,
  });
  const [
    {
      data: {
        attributes: { therapeutic: patient },
      },
    },
    {
      data: { attributes: pageAttributes },
    },
  ] = await Promise.all([patientPromise, pagePromise]);

  return (
    <>
      <Header />
      <BreadCrumb />
      <h1 className='mt-3 text-center text-4xl'>{pageAttributes.header}</h1>
      <main className="mx-auto max-w-screen-md p-3 md:pt-8">
        <InformationBox title={pageAttributes.summary}>
          <div className='p-3'>
            <BlocksRendererClient content={patient.summary} />
            <hr className='separator-line bg-therapeutic' />
            <div className='space-y-4 p-3'>
              <p className='prose prose-stone mx-auto text-center lg:prose-lg'>
                {pageAttributes.call_to_action}
              </p>
              <Questions questions={patient.questions} />
            </div>
          </div>
        </InformationBox>
      </main>
      <ArrowNavigator
        href={`/${lang}/patients/${slug}/finished`}
        direction='right'
        ids={patient.questions.map((q) => q.id)}
      />
    </>
  );
}
