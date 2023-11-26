import ArrowNavigator from '@/components/ArrowNavigator';
import BreadCrumb from '@/components/Breadcrumb';
import Header from '@/components/Header';
import InformationBox from '@/components/InformationBox';
import Markdown from '@/components/Markdown';
import Questions from '@/components/Questions';
import { getPageData } from '@/lib/page_data';
import { getPatient } from '@/lib/patients';
import { Patient } from '@/types/patients_types';
import { TherapeuticPage } from '@/types/page_types';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
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
      <main className={'mx-auto max-w-screen-md p-3'}>
        <InformationBox title={pageAttributes.summary}>
          <section className='p-3'>
            <Markdown>{patient.summary}</Markdown>
          </section>
          <hr className='separator-line bg-therapeutic' />
          <section>
            <Markdown className={'mx-auto text-center'}>
              {pageAttributes.call_to_action}
            </Markdown>
            <Questions questions={patient.questions} />
          </section>
        </InformationBox>
        <ArrowNavigator
          href={`/${lang}/patients/${slug}/finished`}
          direction='right'
        />
      </main>
    </>
  );
}
