import CreateFormGroup from '@/components/CreateGroupForm';
import GroupCard from '@/components/GroupCard';
import { getGroups, getPatients } from '@/lib/data';

interface GroupProps {
  params: { lang: string };
}

export default async function GroupPage({ params: { lang } }: GroupProps) {
  const { data } = await getGroups({
    teacherId: 16,
  });

  const { data: patients } = await getPatients({
    locale: lang,
  });

  return (
    <div className='p-4 space-y-4'>
      <header className='text-3xl'>
        <h1>Suas turmas</h1>
      </header>
      <div className='flex flex-row flex-wrap gap-4 justify-center md:justify-start'>
        {data.map((group) => {
          const { description, slug } = group.attributes;
          return (
            <GroupCard key={group.id} description={description} slug={slug} />
          );
        })}
      </div>

      <h2 className='text-3xl'>Crie uma nova turma</h2>
      <CreateFormGroup patients={patients} />
    </div>
  );
}
