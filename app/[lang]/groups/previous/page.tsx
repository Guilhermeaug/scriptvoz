import GroupCard from '@/components/GroupCard';
import InformationBox from '@/components/InformationBox';
import { authOptions } from '@/lib/auth';
import { getGroups } from '@/lib/groups';
import { Groups } from '@/types/group_types';
import { getServerSession } from 'next-auth';
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
    <div>
      <h1 className={'p-3 text-center text-4xl'}>Docente</h1>
      <div className='mx-auto mt-4 flex max-w-screen-md flex-col space-y-4 p-3'>
        <InformationBox title={'Turmas Antigas'}>
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
                  <Link key={group.id} href={`${slug}`}>
                    <GroupCard
                      title={title}
                      numberOfStudents={numberOfStudents}
                    />
                  </Link>
                );
              })}
            </ul>
          </article>
        </InformationBox>
      </div>
    </div>
  );
}
