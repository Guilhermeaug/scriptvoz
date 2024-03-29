import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import StudentStatus from '@/components/StudentStatus';
import { getGroupData, toggleGroup } from '@/lib/groups';
import { Group as GroupType } from '@/types/group_types';
import { BookmarkSlashIcon } from '@heroicons/react/24/solid';
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
  }: GroupType = await getGroupData({
    slug,
  });

  const patientsIds = patients.data.map((patient) => patient.id);

  async function enableGroup() {
    'use server';

    try {
      await toggleGroup({ id, active: true });
    } catch (e) {}

    redirect('groups');
  }

  return (
    <>
      <header className='flex flex-row items-center justify-between p-5'>
        <section>
          <h1 className='text-3xl'>{title}</h1>
        </section>
        <form className={'space-x-2'}>
          <button className='btn btn-secondary' formAction={enableGroup}>
            Ativar turma
            <BookmarkSlashIcon className='h-6 w-6' />
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
    </>
  );
}
