import ArrowNavigator from '@/components/ArrowNavigator';
import Pills from '@/components/Pills';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import { getPageData } from '@/lib/page_data';
import { DiagnosticPage } from '@/types/diagnostic_types';
import Markdown from '@/components/Markdown';
import Provider from '@/contexts/Provider';
import arrayShuffle from 'array-shuffle';
import { getPatient } from '@/lib/patients';
import { Patient } from '@/types/patients_types';
import Header from '@/components/Header';
import BreadCrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

interface DiagnosticStepProps {
  params: { lang: string; slug: string };
}

export default async function EvaluationStep({
  params: { lang, slug },
}: DiagnosticStepProps) {
  const patientPromise: Promise<Patient> = getPatient({
    locale: lang,
    slug,
  });
  const pagePromise: Promise<DiagnosticPage> = getPageData({
    path: 'diagnostic-page',
    locale: lang,
  });
  const [
    {
      data: {
        attributes: { diagnostic: patient },
      },
    },
    {
      data: { attributes: pageAttributes },
    },
  ] = await Promise.all([patientPromise, pagePromise]);

  return (
    <Provider color='diagnostic'>
      <Header />
      <BreadCrumb />
      <h1 className='text-center text-4xl mt-3'>{pageAttributes.header}</h1>
      <main className='container mx-auto p-3'>
        <InformationBox title={pageAttributes.summary}>
          <section className='p-3'>
            <Markdown>{patient.summary}</Markdown>
          </section>
          <hr className='separator-line bg-diagnostic' />
          <section>
            <Markdown className={'mx-auto text-center'}>
              {pageAttributes.call_to_action}
            </Markdown>
            <Pills pills={arrayShuffle(patient.pills)} />
          </section>
        </InformationBox>
      </main>
      <ArrowNavigator
        href={`/${lang}/patients/${slug}/therapeutic`}
        direction='right'
      />
    </Provider>
  );
}
