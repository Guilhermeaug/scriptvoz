import ArrowNavigator from '@/components/ArrowNavigator';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import { getPageData } from '@/lib/page_data';
import { TherapeuticPage } from '@/types/therapeutic_types';
import Questions from '@/components/Questions';
import Markdown from '@/components/Markdown';
import Provider from '@/contexts/Provider';
import { getPatient } from '@/lib/patients';
import { Patient } from '@/types/patients_types';
import Header from '@/components/Header';
import BreadCrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

interface TherapeuticStepProps {
  params: { lang: string; slug: string };
}

export default async function TherapeuticStep({
  params: { lang, slug },
}: TherapeuticStepProps) {
  const patientPromise: Promise<Patient> = getPatient({
    locale: lang,
    slug,
  });
  const pagePromise: Promise<TherapeuticPage> = getPageData({
    path: 'therapeutic-page',
    locale: lang,
  });
  const [
    {
      data: {
        attributes: { therapeutic: patient },
      },
    },
    {
      data: { attributes: pageAttributes },
    },
  ] = await Promise.all([patientPromise, pagePromise]);

  return (
    <Provider color='therapeutic'>
      <Header />
      <BreadCrumb />
      <h1 className='text-center text-4xl mt-3'>{pageAttributes.header}</h1>
      <main className={'mx-auto p-3 max-w-screen-lg'}>
        <InformationBox title={pageAttributes.summary}>
          <section className='p-3'>
            <Markdown>{patient.summary}</Markdown>
          </section>
          <hr className='separator-line bg-therapeutic' />
          <section>
            <Markdown className={'mx-auto text-center'}>
              {pageAttributes.call_to_action}
            </Markdown>
            <Questions questions={patient.questions} />
          </section>
        </InformationBox>
        <ArrowNavigator
          href={`/${lang}/patients/${slug}/finished`}
          direction='right'
        />
      </main>
    </Provider>
  );
}
