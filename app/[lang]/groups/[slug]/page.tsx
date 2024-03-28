import InformationBox from '@/components/InformationBox';
import InviteButton from '@/components/InviteButton';
import StudentStatus from '@/components/StudentStatus';
import { getGroupData, toggleGroup } from '@/lib/groups';
import { Group as GroupType } from '@/types/group_types';
import { BookmarkSlashIcon } from '@heroicons/react/24/solid';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

interface GroupProps {
  params: { lang: string; slug: string };
}

export default async function Group({ params: { lang, slug } }: GroupProps) {
  const {
    data: {
      id,
      attributes: { title, students, patients, isActive },
    },
  }: GroupType = await getGroupData({
    slug,
  });

  const patientsIds = patients.data.map((patient) => patient.id);
  const inviteButtonHref = `https://scriptvoz.medicina.ufmg.br/${lang}/invite/${slug}`;

  async function disableGroup() {
    'use server';

    await toggleGroup({ id, active: !isActive });
    revalidateTag('groups');
    redirect('/groups');
  }

  return (
    <>
      <h1 className={'p-3 text-center text-4xl'}>Docente</h1>
      <main className='mx-auto mt-4 flex max-w-screen-md flex-col space-y-4 p-3'>
        <InformationBox title='Alunos'>
          <article className='space-y-14 p-4'>
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
              {students.data.length === 0 && (
                <li className={'text-center text-gray-500'}>
                  Não há alunos nesta turma
                </li>
              )}
            </ul>
            <div className={'flex justify-evenly gap-4'}>
              <InviteButton inviteLink={inviteButtonHref} />
              <form action={disableGroup}>
                <button
                  type={'submit'}
                  className='btn btn-secondary text-white'
                >
                  {isActive ? 'Desativar Turma' : 'Ativar Turma'}
                  <BookmarkSlashIcon className='h-6 w-6' />
                </button>
              </form>
            </div>
          </article>
        </InformationBox>
      </main>
    </>
  );
}
