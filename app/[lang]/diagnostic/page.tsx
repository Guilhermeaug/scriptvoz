import ArrowNavigator from '@/components/ArrowNavigator';
import Diagnostics from '@/components/Diagnostics';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import ThemeProvider from '@/contexts/ThemeProvider';
import { getData } from '@/lib/data';
import { DiagnosticData, DiagnosticPage } from '@/types/diagnostic_types';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function EvaluationStep({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { data }: DiagnosticData = await getData({
    path: 'diagnostics/1',
    locale: lang,
  });
  const { attributes } = data;
  const { pills } = attributes;

  const { data: page }: DiagnosticPage = await getData({
    path: 'diagnostic-page',
    locale: lang,
  });
  const { attributes: pageAttributes } = page;

  return (
    <ThemeProvider color='diagnostic'>
      <ArrowNavigator href={`${lang}/evaluation`} direction='left' />
      <header>
        <h1 className='text-center text-4xl'>{pageAttributes.header}</h1>
      </header>
      <main className='mt-6 flex flex-col items-center'>
        <InformationHeader title={pageAttributes.summary} />
        <InformationBox
          className='border-none'
          description={attributes.summary}
        />
        <hr className='separator-line bg-diagnostic w-full' />
        <InformationBox
          className='border-none'
          description={pageAttributes.call_to_action}
        />
        <Diagnostics pills={pills} />
      </main>
      <ArrowNavigator href={`${lang}/therapeutic`} direction='right' />
    </ThemeProvider>
  );
}
