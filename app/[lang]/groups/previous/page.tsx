import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import GroupCard from '@/components/GroupCard';
import { getGroups } from '@/lib/groups';
import { Groups } from '@/types/group_types';
import Header from '@/components/Header';
import InformationBox from '@/components/InformationBox';
import Provider from '@/contexts/Provider';
import Link from 'next/link';

interface GroupProps {
  params: { lang: string };
}

export default async function PreviousGroupsPage({
  params: { lang },
}: GroupProps) {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  const { data: groups }: Groups = await getGroups({
    teacherId: parseInt(user.id),
    active: false,
  });

  return (
    <Provider color={'evaluation'}>
      <Header />
      <h1 className={'text-4xl p-3 text-center'}>Docente</h1>
      <main className='mx-auto p-3 flex flex-col space-y-4 mt-4 max-w-screen-md'>
        <InformationBox title={'Turmas Antigas'} color={'diagnostic'}>
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
                  <Link href={`${slug}`}>
                    <GroupCard
                      key={group.id}
                      title={title}
                      numberOfStudents={numberOfStudents}
                    />
                  </Link>
                );
              })}
            </ul>
          </article>
        </InformationBox>
      </main>
    </Provider>
  );
}
