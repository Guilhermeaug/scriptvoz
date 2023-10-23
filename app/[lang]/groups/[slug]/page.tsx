import InformationBox from '@/components/InformationBox';
import Provider from '@/contexts/Provider';
import { Group } from '@/types/group_types';
import StudentStatus from '@/components/StudentStatus';
import { BookmarkSlashIcon, ClipboardIcon } from '@heroicons/react/24/solid';
import { getGroupData, toggleGroup } from '@/lib/groups';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import { revalidateTag } from 'next/cache';

interface GroupProps {
  params: { lang: string; slug: string };
}

export default async function Group({ params: { lang, slug } }: GroupProps) {
  const {
    data: {
      id,
      attributes: { title, students, patients, isActive },
    },
  }: Group = await getGroupData({
    slug,
  });

  const patientsIds = patients.data.map((patient) => patient.id);
  const inviteButtonHref = `/${lang}/invite/${slug}`;

  async function disableGroup() {
    'use server';

    await toggleGroup({ id, active: !isActive });
    revalidateTag('groups');
    redirect('/groups');
  }

  return (
    <Provider color='diagnostic'>
      <Header color={'evaluation'} />
      <h1 className={'text-4xl p-3 text-center'}>Docente</h1>
      <main className='mx-auto p-3 flex flex-col space-y-4 mt-4 max-w-screen-md'>
        <InformationBox title='Alunos'>
          <article className='p-4 space-y-14'>
            <ul className={'join join-vertical w-full'}>
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
            </ul>
            <div className={'flex gap-4 justify-evenly'}>
              <a className='btn btn-primary text-white' href={inviteButtonHref}>
                Link de Convite
                <ClipboardIcon className='w-6 h-6' />
              </a>
              <form action={disableGroup}>
                <button
                  type={'submit'}
                  className='btn btn-secondary text-white'
                >
                  {isActive ? 'Desativar Turma' : 'Ativar Turma'}
                  <BookmarkSlashIcon className='w-6 h-6' />
                </button>
              </form>
            </div>
          </article>
        </InformationBox>
      </main>
    </Provider>
  );
}
