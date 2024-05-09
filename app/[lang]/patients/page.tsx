import { getPageData } from '@/lib/page_data';
import { getPatients } from '@/lib/patients';
import { PatientsPage as PatientsPageType } from '@/types/page_types';
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
  const pageData: Promise<PatientsPageType> = getPageData({
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
    <div className='space-y-6 p-4'>
      <h1 className='text-3xl'>{pageAttributes.clinical_cases}</h1>
      <section className='flex flex-wrap gap-4'>
        {patients.map((patient, index) => (
          <Link
            key={patient.id}
            href={`patients/${patient.attributes.searchTitle}/evaluation`}
            className='card w-80 bg-base-100 text-left shadow-xl'
          >
            <figure className='h-40 bg-primary text-3xl'>{index + 1}</figure>
            <div className='card-body'>
              <h2 className='card-title'>{patient.attributes.title}</h2>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
