import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import { getGroupData, getPageData, getPatientStep } from '@/lib/data';
import Provider from '@/contexts/Provider';
import { Group } from '@/types/group_types';
import StudentStatus from '@/components/StudentStatus';
import { ClipboardIcon } from '@heroicons/react/24/solid';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

interface GroupProps {
  params: { lang: string; searchTitle: string };
}

export default async function Group({
  params: { lang, searchTitle },
}: GroupProps) {
  const { data }: Group = await getGroupData({
    slug: searchTitle,
  });

  const attributes = data.attributes;
  const { students, teacher, patients } = attributes;
  const patientsIds = patients.data.map((patient) => patient.id);

  const inviteButtonHref = `/${lang}/invite/${searchTitle}`;

  return (
    <Provider color='evaluation'>
      <header className='flex flex-row justify-between items-center p-5'>
        <section>
          <h1 className='text-3xl'>{attributes.description}</h1>
          <h2 className='text-3xl'>
            Docente: {teacher.data.attributes.username}
          </h2>
        </section>
        <a className='btn btn-primary' href={inviteButtonHref}>
          Link de Convite
          <ClipboardIcon className='w-6 h-6' />
        </a>
      </header>
      <main className='mt-6'>
        <section>
          <InformationHeader title='Relação dos estudantes' />
          <InformationBox title='Alunos'>
            <div className='space-y-4'>
              {students.data.map((student) => {
                return (
                  <StudentStatus
                    key={student.id}
                    id={student.id}
                    student={student}
                    patientsIds={patientsIds}
                  />
                );
              })}
            </div>
          </InformationBox>
        </section>
      </main>
    </Provider>
  );
}
