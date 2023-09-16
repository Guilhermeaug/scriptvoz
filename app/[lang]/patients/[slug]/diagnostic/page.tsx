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
      <ArrowNavigator
        href={`/${lang}/patients/${slug}/evaluation`}
        direction='left'
      />
      <header>
        <h1 className='text-center text-4xl'>{pageAttributes.header}</h1>
      </header>
      <main className='mt-6'>
        <section className='flex flex-col items-center'>
          <InformationHeader title={pageAttributes.summary} />
          <InformationBox className='border-none'>
            <Markdown>{patient.summary}</Markdown>
          </InformationBox>
        </section>
        <hr className='separator-line bg-diagnostic' />
        <section>
          <div className='flex flex-col items-center'>
            <InformationBox className='border-none'>
              <Markdown>{pageAttributes.call_to_action}</Markdown>
            </InformationBox>
          </div>
          <Pills pills={arrayShuffle(patient.pills)} />
        </section>
      </main>
      <ArrowNavigator
        href={`/${lang}/patients/${slug}/therapeutic`}
        direction='right'
      />
    </Provider>
  );
}
