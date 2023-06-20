import { getPageData } from '@/lib/data';
import { PatientData, PatientsPage } from '@/types/patients_types';
import Link from 'next/link';

export const metadata = {
  title: 'Página de escolha de pacientes',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function Patients({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { data: patients }: PatientData = await getPageData({
    path: 'patients',
    locale: lang,
  });

  const { data: page }: PatientsPage = await getPageData({
    path: 'patients-page',
    locale: lang,
  });
  const { attributes: pageAttributes } = page;

  function PatientItem({ title }: { title: string }) {
    return (
      <Link href={`patients/${title}/evaluation`}>
        <div className='bg-primary text-primary-content text-center p-3 rounded-lg'>
          <h2>{title}</h2>
        </div>
      </Link>
    );
  }

  return (
    <>
      <header>
        <h1 className='text-4xl text-center'>{pageAttributes.header}</h1>
      </header>
      <main>
        <section className='flex flex-row flex-wrap gap-3 justify-center mt-20'>
          {patients.map((patient) => (
            <PatientItem key={patient.id} title={patient.attributes.title} />
          ))}
        </section>
      </main>
    </>
  );
}
