import ArrowNavigator from '@/components/ArrowNavigator';
import Diagnostics from '@/components/Diagnostics';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import ThemeProvider from '@/contexts/ThemeProvider';
import { getData } from '@/lib/data';
import { TherapeuticData, TherapeuticPage } from '@/types/therapeutic_types';

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
      <ArrowNavigator href={`${lang}/diagnostic`} direction='left' />
      <header>
        <h1 className='text-center text-4xl'>{pageAttributes.header}</h1>
      </header>
      <main className='mt-6 flex flex-col items-center'>
        <InformationHeader title={pageAttributes.summary} />
        <InformationBox
          className='border-none'
          description={attributes.summary}
        />
        <p className='prose mb-6 p-2'>
          <hr className='separator-line space-y-4 bg-therapeutic' />
          {pageAttributes.call_to_action}
        </p>
        <Diagnostics pills={pills} />
      </main>
    </ThemeProvider>
  );
}
