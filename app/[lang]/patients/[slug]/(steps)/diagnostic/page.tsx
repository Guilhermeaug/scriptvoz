import ArrowNavigator from '@/components/ArrowNavigator';
import BlocksRendererClient from '@/components/BlocksRendererClient';
import InformationBox from '@/components/InformationBox';
import Questions from '@/components/Questions';
import { getPageData } from '@/lib/page_data';
import { getPatient } from '@/lib/patients';
import { DiagnosticPage, GeneralPage } from '@/types/page_types';
import { Patient } from '@/types/patients_types';
import { navigateTo } from '@/util/navigateTo';

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
  const generalPagePromise: Promise<GeneralPage> = getPageData({
    path: 'general',
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
    {
      data: { attributes: generalPageAttributes },
    },
  ] = await Promise.all([patientPromise, pagePromise, generalPagePromise]);

  const { correctAmount, correctIds } = patient.questions.reduce(
    (
      acc: {
        correctAmount: number;
        correctIds: number[];
      },
      q,
    ) => {
      q.test_cases.forEach((ts) => {
        if (ts.is_correct) {
          acc.correctAmount += 1;
          acc.correctIds.push(ts.id);
        }
      });
      return acc;
    },
    { correctAmount: 0, correctIds: [] },
  );

  return (
    <div className='mx-auto mt-6 max-w-screen-md space-y-4 p-3'>
      <h1 className='text-wrap break-words text-center text-2xl md:text-4xl'>
        {pageAttributes.header}
      </h1>
      <InformationBox title={pageAttributes.summary} color='diagnostic'>
        <div className='space-y-4 p-3'>
          <BlocksRendererClient content={patient.summary} />
          <hr className='separator-line' />
          <p className='prose prose-stone mx-auto text-center lg:prose-lg'>
            {pageAttributes.call_to_action}
          </p>
          <Questions questions={patient.questions} />
        </div>
      </InformationBox>
      <ArrowNavigator
        href={navigateTo(lang, `patients/${slug}/therapeutic`)}
        direction='right'
        ids={correctIds}
        correctAmount={correctAmount}
        message={generalPageAttributes.finished_questions_message}
      />
    </div>
  );
}
