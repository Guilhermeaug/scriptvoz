import Header from '@/components/Header';
import InformationBox from '@/components/InformationBox';
import { getPageData } from '@/lib/page_data';
import { getPatients } from '@/lib/patients';
import { PatientsPage } from '@/types/page_types';
import { PatientData } from '@/types/patients_types';
import Link from 'next/link';

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
    <>
      <Header color='evaluation' />
      <h1 className='mt-6 text-center text-5xl'>
        {pageAttributes.header}
      </h1>
      <main className='container mx-auto mt-8 p-3 max-w-screen-md'>
        <InformationBox title='Casos Clínicos'>
          <section className='flex flex-wrap justify-center gap-2 p-4'>
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
    </>
  );
}

function PatientItem({ slug, title }: { slug: string; title: string }) {
  return (
    <Link href={`patients/${slug}/evaluation`}>
      <div className='w-44 rounded-lg bg-orange p-3 text-center uppercase text-white'>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}
