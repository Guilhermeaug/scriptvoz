import CreateFormGroup from '@/components/CreateGroupForm';
import GroupCard from '@/components/GroupCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { getPatients } from '@/lib/patients';
import { getGroups } from '@/lib/groups';
import { Groups } from '@/types/group_types';
import { PatientData } from '@/types/patients_types';
import Header from '@/components/Header';
import Provider from '@/contexts/Provider';

interface GroupProps {
  params: { lang: string };
}

export default async function GroupPage({ params: { lang } }: GroupProps) {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  const groupsPromise: Promise<Groups> = getGroups({
    teacherId: parseInt(user.id),
  });
  const patientsPromise: Promise<PatientData> = getPatients({
    locale: lang,
  });

  const [{ data: groups }, { data: patients }] = await Promise.all([
    groupsPromise,
    patientsPromise,
  ]);

  return (
    <Provider color={'evaluation'}>
      <Header />
      <h1 className={'text-4xl p-3'}>Suas turmas</h1>
      <main className='container mx-auto p-3 flex flex-col space-y-4 mt-4'>
        <Link className={'self-end'} href={'groups/previous'}>
          <button className={'btn btn-ghost'}>Visualizar turmas antigas</button>
        </Link>
        <section className='flex flex-row flex-wrap gap-4 justify-center md:justify-start'>
          {groups.map((group) => {
            const { description, slug } = group.attributes;
            return (
              <GroupCard
                key={group.id}
                description={description}
                slug={slug}
                href={`groups/${slug}`}
                id={group.id}
              />
            );
          })}
        </section>
        <h2 className='text-3xl'>Crie uma nova turma</h2>
        <CreateFormGroup patients={patients} />
      </main>
    </Provider>
  );
}
