import ArrowNavigator from '@/components/ArrowNavigator';
import BreadCrumb from '@/components/Breadcrumb';
import Header from '@/components/Header';
import InformationBox from '@/components/InformationBox';
import Markdown from '@/components/Markdown';
import Pills from '@/components/Pills';
import { getPageData } from '@/lib/page_data';
import { getPatient } from '@/lib/patients';
import { DiagnosticPage } from '@/types/page_types';
import { Patient } from '@/types/patients_types';
import arrayShuffle from 'array-shuffle';

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
    <>
      <Header />
      <BreadCrumb />
      <h1 className='mt-3 text-center text-4xl'>{pageAttributes.header}</h1>
      <main className={'mx-auto max-w-screen-md p-3'}>
        <InformationBox title={pageAttributes.summary}>
          <section className='p-3'>
            <Markdown>{patient.summary}</Markdown>
          </section>
          <hr className='separator-line bg-diagnostic' />
          <section className="p-3">
            <Markdown className={'mx-auto text-center'}>
              {pageAttributes.call_to_action}
            </Markdown>
            <Pills patientId={patient.id} pills={arrayShuffle(patient.pills)} />
          </section>
        </InformationBox>
      </main>
      <ArrowNavigator
        href={`/${lang}/patients/${slug}/therapeutic`}
        direction='right'
        ids={patient.pills.filter(pill => pill.correct).map((pill) => pill.id)}
      />
    </>
  );
}
