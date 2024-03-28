import ArrowNavigator from '@/components/ArrowNavigator';
import BlocksRendererClient from '@/components/BlocksRendererClient';
import InformationBox from '@/components/InformationBox';
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
      <h1 className='mt-3 text-center text-4xl'>{pageAttributes.header}</h1>
      <div className={'mx-auto max-w-screen-md p-3 md:pt-8'}>
        <InformationBox title={pageAttributes.summary}>
          <div className='p-3'>
            <BlocksRendererClient content={patient.summary} />
            <hr className='separator-line bg-diagnostic' />
            <div className='p-3'>
              <p className='prose prose-stone mx-auto text-center lg:prose-lg'>
                {pageAttributes.call_to_action}
              </p>
              <Pills
                patientId={patient.id}
                pills={arrayShuffle(patient.pills)}
              />
            </div>
          </div>
        </InformationBox>
      </div>
      <ArrowNavigator
        href={`/${lang}/patients/${slug}/therapeutic`}
        direction='right'
        ids={patient.pills
          .filter((pill) => pill.correct)
          .map((pill) => pill.id)}
      />
    </>
  );
}
