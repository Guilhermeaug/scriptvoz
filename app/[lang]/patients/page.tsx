import { getPageData } from '@/lib/page_data';
import { PatientData, PatientsPage } from '@/types/patients_types';
import Link from 'next/link';
import { getPatients } from '@/lib/patients';

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
      <header>
        <h1 className='text-4xl text-center'>{pageAttributes.header}</h1>
      </header>
      <main>
        <section className='flex flex-row flex-wrap gap-3 justify-center mt-20'>
          {patients.map((patient) => (
            <PatientItem
              key={patient.id}
              title={patient.attributes.title}
              slug={patient.attributes.searchTitle}
            />
          ))}
        </section>
      </main>
    </>
  );
}

function PatientItem({ slug, title }: { slug: string; title: string }) {
  return (
    <Link href={`patients/${slug}/evaluation`}>
      <div className='bg-primary text-primary-content text-center p-3 rounded-lg'>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}
