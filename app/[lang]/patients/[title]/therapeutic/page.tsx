import ArrowNavigator from '@/components/ArrowNavigator';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import { getPageData, getPatientStep } from '@/lib/data';
import {
  TherapeuticAttributes,
  TherapeuticPage,
} from '@/types/therapeutic_types';
import Questions from '@/components/Questions';
import Markdown from '@/components/Markdown';
import Provider from '@/contexts/Provider';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

interface TherapeuticStepProps {
  params: { lang: string; title: string };
}

export default async function TherapeuticStep({
  params: { lang, title },
}: TherapeuticStepProps) {
  const patientPromise: Promise<TherapeuticAttributes> = getPatientStep({
    query: title,
    path: 'therapeutic',
    locale: lang,
  });
  const pagePromise: Promise<TherapeuticPage> = getPageData({
    path: 'therapeutic-page',
    locale: lang,
  });
  const [patient, page] = await Promise.all([patientPromise, pagePromise]);
  const pageAttributes = page.data.attributes;

  return (
    <Provider color='therapeutic'>
      <ArrowNavigator
        href={`/${lang}/patients/${title}/diagnostic`}
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
        <hr className='separator-line bg-therapeutic' />
        <section>
          <div className='flex flex-col items-center'>
            <InformationBox className='border-none'>
              <Markdown>{pageAttributes.call_to_action}</Markdown>
            </InformationBox>
          </div>
          <Questions questions={patient.questions} />
        </section>
        <ArrowNavigator
          href={`/${lang}/patients/${title}/finished`}
          direction='right'
        />
      </main>
    </Provider>
  );
}
