import ArrowNavigator from '@/components/ArrowNavigator';
import Pills from '@/components/Pills';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import ThemeProvider from '@/contexts/ThemeProvider';
import { getData } from '@/lib/data';
import { TherapeuticData, TherapeuticPage } from '@/types/therapeutic_types';
import Markdown from '@/components/Markdown';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function TherapeuticStep({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { data }: TherapeuticData = await getData({
    path: 'therapeutics/1',
    locale: lang,
  });
  const { attributes } = data;
  const { pills } = attributes;

  const { data: page }: TherapeuticPage = await getData({
    path: 'therapeutic-page',
    locale: lang,
  });
  const { attributes: pageAttributes } = page;

  return (
    <ThemeProvider color='therapeutic'>
      <ArrowNavigator href={`${lang}/patients/diagnostic`} direction='left' />
      <header>
        <h1 className='text-center text-4xl'>{pageAttributes.header}</h1>
      </header>
      <main className='mt-6 flex flex-col items-center'>
        <InformationHeader title={pageAttributes.summary} />
        <InformationBox className='border-none'>
          <Markdown>{attributes.summary}</Markdown>
        </InformationBox>
        <hr className='separator-line bg-therapeutic w-full' />
        <InformationBox className='border-none'>
          <Markdown>{pageAttributes.call_to_action}</Markdown>
        </InformationBox>
        <Pills pills={pills} />
      </main>
    </ThemeProvider>
  );
}
