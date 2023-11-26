import { authOptions } from '@/lib/auth';
import { applyStudent, getGroupData } from '@/lib/groups';
import { Group } from '@/types/group_types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

interface GroupInviteProps {
  params: { lang: string; slug: string };
}

export default async function GroupInvite({
  params: { lang, slug },
}: GroupInviteProps) {
  const {
    data: {
      id: groupId,
      attributes: { description, patients },
    },
  }: Group = await getGroupData({
    slug,
  });
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  const patientsIds = patients.data.map((patient) => patient.id);

  async function subscribeStudent() {
    'use server';

    await applyStudent({
      groupId,
      userId: parseInt(session!.user.id),
      patientsIds: patientsIds,
    });
    redirect('/');
  }

  return (
    <main
      className={'flex h-screen flex-col items-center justify-center gap-8'}
    >
      <>
        <header>
          <h1 className='text-2xl'>
            Você foi convidado a participar da turma {description}
          </h1>
        </header>
        <form>
          <button className='btn btn-secondary' formAction={subscribeStudent}>
            Clique para confirmar sua participação
          </button>
        </form>
      </>
    </main>
  );
}
