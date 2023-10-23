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
import InformationBox from '@/components/InformationBox';

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
      <h1 className={'text-4xl p-3 text-center'}>Docente</h1>
      <main className='mx-auto p-3 flex flex-col space-y-4 mt-4 max-w-screen-md'>
        <InformationBox title={'Turmas'} color={'diagnostic'}>
          <article className='p-4 space-y-14'>
            <ul>
              {groups.map((group) => {
                const {
                  slug,
                  title,
                  students: {
                    data: { length: numberOfStudents },
                  },
                } = group.attributes;
                return (
                  <Link key={group.id} href={`groups/${slug}`}>
                    <GroupCard
                      title={title}
                      numberOfStudents={numberOfStudents}
                    />
                  </Link>
                );
              })}
            </ul>
            <div className={'flex gap-4 justify-evenly'}>
              <CreateFormGroup patients={patients} />
              <Link
                className={'btn btn-primary text-white'}
                href={'groups/previous'}
              >
                Turmas anteriores
              </Link>
            </div>
          </article>
        </InformationBox>
      </main>
    </Provider>
  );
}
