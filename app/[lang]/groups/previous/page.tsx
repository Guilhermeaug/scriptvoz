import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import GroupCard from '@/components/GroupCard';
import { getGroups } from '@/lib/groups';
import { Groups } from '@/types/group_types';

interface GroupProps {
  params: { lang: string };
}

export default async function PreviousGroupsPage({
  params: { lang },
}: GroupProps) {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  const { data }: Groups = await getGroups({
    teacherId: parseInt(user.id),
    active: false,
  });

  return (
    <>
      <header className='text-3xl'>
        <h1>Turmas anteriores</h1>
      </header>
      <main className='flex flex-col space-y-4 mt-4'>
        <section className='flex flex-row flex-wrap gap-4 justify-center md:justify-start'>
          {data.map((group) => {
            const { description, slug } = group.attributes;
            return (
              <GroupCard
                key={group.id}
                description={description}
                slug={slug}
                href={`previous/${slug}`}
                id={group.id}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
