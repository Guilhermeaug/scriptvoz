import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import Provider from '@/contexts/Provider';
import { Group } from '@/types/group_types';
import StudentStatus from '@/components/StudentStatus';
import { BookmarkSlashIcon, ClipboardIcon } from '@heroicons/react/24/solid';
import { getGroupData, toggleGroup } from '@/lib/groups';
import { redirect } from 'next/navigation';

interface GroupProps {
  params: { lang: string; slug: string };
}

export default async function Group({ params: { lang, slug } }: GroupProps) {
  const {
    data: {
      id,
      attributes: { title, students, patients },
    },
  }: Group = await getGroupData({
    slug,
  });

  const patientsIds = patients.data.map((patient) => patient.id);
  const inviteButtonHref = `/${lang}/invite/${slug}`;

  async function disableGroup() {
    'use server';

    try {
      await toggleGroup({ id, active: false });
    } catch (e) {}

    redirect('groups');
  }

  return (
    <Provider color='standard'>
      <header className='flex flex-row justify-between items-center p-5'>
        <section>
          <h1 className='text-3xl'>{title}</h1>
        </section>
        <form className={'space-x-2'}>
          <a className='btn btn-primary' href={inviteButtonHref}>
            Link de Convite
            <ClipboardIcon className='w-6 h-6' />
          </a>
          <button className='btn btn-secondary' formAction={disableGroup}>
            Desativar turma
            <BookmarkSlashIcon className='w-6 h-6' />
          </button>
        </form>
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
