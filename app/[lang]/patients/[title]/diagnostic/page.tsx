import ArrowNavigator from '@/components/ArrowNavigator';
import Pills from '@/components/Pills';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import ThemeProvider from '@/contexts/ThemeProvider';
import { getPageData, getPatientStep } from '@/lib/data';
import { DiagnosticAttributes, DiagnosticPage } from '@/types/diagnostic_types';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

interface DiagnosticStepProps {
  params: { lang: string; title: string };
}

export default async function EvaluationStep({
  params: { lang, title },
}: DiagnosticStepProps) {
  const patientPromise: Promise<DiagnosticAttributes> = getPatientStep({
    query: title,
    path: 'diagnostic',
    locale: lang,
  });
  const pagePromise: Promise<DiagnosticPage> = getPageData({
    path: 'diagnostic-page',
    locale: lang,
  });
  const [patient, page] = await Promise.all([patientPromise, pagePromise]);
  const pageAttributes = page.data.attributes;

  return (
    <ThemeProvider color='diagnostic'>
      <ArrowNavigator
        href={`${lang}/patients/${title}/evaluation`}
        direction='left'
      />
      <header>
        <h1 className='text-center text-4xl'>{pageAttributes.header}</h1>
      </header>
      <main className='mt-6'>
        <section className='flex flex-col items-center'>
          <InformationHeader title={pageAttributes.summary} />
          <InformationBox
            className='border-none'
            description={patient.summary}
          />
        </section>
        <hr className='separator-line bg-diagnostic' />
        <section>
          <div className='flex flex-col items-center'>
            <InformationBox
              className='border-none'
              description={pageAttributes.call_to_action}
            />
          </div>
          <Pills pills={patient.pills} />
        </section>
      </main>
      <ArrowNavigator
        href={`${lang}/patients/${title}/therapeutic`}
        direction='right'
      />
    </ThemeProvider>
  );
}
