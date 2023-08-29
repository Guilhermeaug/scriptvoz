import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import { getGroupData, getPageData, getPatientStep } from '@/lib/data';
import Provider from '@/contexts/Provider';
import { Group } from '@/types/group_types';
import StudentStatus from '@/components/StudentStatus';
import { ClipboardIcon } from '@heroicons/react/24/solid';
import { applyStudent } from '@/lib/group';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

interface GroupInviteProps {
  params: { lang: string; groupTitle: string };
}

export default async function GroupInvite({
  params: { lang, groupTitle },
}: GroupInviteProps) {
  const { data }: Group = await getGroupData({
    slug: groupTitle,
  });

  const attributes = data.attributes;
  const { description } = attributes;
  const patientsIds = attributes.patients.data.map((patient) => patient.id);

  async function subscribeStudent() {
    'use server';

    await applyStudent({
      groupId: data.id,
      userId: 20,
      patientsIds: patientsIds
    });
  }

  return (
    <Provider color='evaluation'>
      <p className='text-2xl'>
        Você foi convidado a participar da turma {description}
      </p>
      <form>
        <button className='btn btn-secondary' formAction={subscribeStudent}>
          Clique para confirmar sua participação
        </button>
      </form>
    </Provider>
  );
}
