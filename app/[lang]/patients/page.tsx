import { getPageData } from '@/lib/page_data';
import { PatientData, PatientsPage } from '@/types/patients_types';
import Link from 'next/link';
import { getPatients } from '@/lib/patients';
import InformationBox from '@/components/InformationBox';
import Provider from '@/contexts/Provider';
import Header from '@/components/Header';

export const metadata = {
  title: 'Página de escolha de pacientes',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function PatientsPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const patientsData: Promise<PatientData> = getPatients({
    locale: lang,
  });
  const pageData: Promise<PatientsPage> = getPageData({
    path: 'patients-page',
    locale: lang,
  });

  const [
    { data: patients },
    {
      data: { attributes: pageAttributes },
    },
  ] = await Promise.all([patientsData, pageData]);

  return (
    <Provider color={'diagnostic'}>
      <Header color={'evaluation'} />
      <h1 className='text-4xl text-center mt-16 underline'>
        {pageAttributes.header}
      </h1>
      <main className={'container mx-auto mt-16'}>
        <InformationBox title={'Casos Clínicos'}>
          <section className='flex flex-row flex-wrap gap-3 justify-center p-4'>
            {patients.map((patient) => (
              <PatientItem
                key={patient.id}
                title={patient.attributes.title}
                slug={patient.attributes.searchTitle}
              />
            ))}
          </section>
        </InformationBox>
      </main>
    </Provider>
  );
}

function PatientItem({ slug, title }: { slug: string; title: string }) {
  return (
    <Link href={`patients/${slug}/evaluation`}>
      <div className='bg-orange text-white text-center p-3 rounded-lg uppercase w-44'>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}
