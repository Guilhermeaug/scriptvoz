import CreateFormGroup from '@/components/CreateGroupForm';
import GroupCard from '@/components/GroupCard';
import InformationBox from '@/components/InformationBox';
import { authOptions } from '@/lib/auth';
import { getGroups } from '@/lib/groups';
import { getPatients } from '@/lib/patients';
import { Groups } from '@/types/group_types';
import { PatientData } from '@/types/patients_types';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

interface GroupProps {
  params: { lang: string };
}

export default async function GroupPage({ params: { lang } }: GroupProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
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
    <>
      <h1 className={'p-3 text-center text-4xl'}>Docente</h1>
      <main className='mx-auto mt-4 flex max-w-screen-md flex-col space-y-4 p-3'>
        <InformationBox title={'Turmas'} color={'diagnostic'}>
          <article className='space-y-14 p-4'>
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
              {groups.length === 0 && (
                <p className={'text-center text-lg text-gray-500'}>
                  Você ainda não possui turmas.
                </p>
              )}
            </ul>
            <div className={'flex justify-evenly gap-4'}>
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
    </>
  );
}
