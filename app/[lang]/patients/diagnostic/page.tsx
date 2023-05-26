import ArrowNavigator from '@/components/ArrowNavigator';
import Pills from '@/components/Pills';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import ThemeProvider from '@/contexts/ThemeProvider';
import { getData } from '@/lib/data';
import { DiagnosticData, DiagnosticPage } from '@/types/diagnostic_types';
import Markdown from '@/components/Markdown';

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
      <ArrowNavigator href={`${lang}/patients/evaluation`} direction='left' />
      <header>
        <h1 className='text-center text-4xl'>{pageAttributes.header}</h1>
      </header>
      <main className='mt-6 flex flex-col items-center'>
        <InformationHeader title={pageAttributes.summary} />
        <InformationBox className='border-none'>
          <Markdown>{attributes.summary}</Markdown>
        </InformationBox>
        <hr className='separator-line bg-diagnostic w-full' />
        <InformationBox className='border-none'>
          <Markdown>{pageAttributes.call_to_action}</Markdown>
        </InformationBox>
        <Pills pills={pills} />
      </main>
      <ArrowNavigator href={`${lang}/patients/therapeutic`} direction='right' />
    </ThemeProvider>
  );
}
