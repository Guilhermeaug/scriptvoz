import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import Markdown from '@/components/Markdown';
import { authOptions } from '@/lib/auth';
import { endProgram } from '@/lib/groups';
import { getPatient } from '@/lib/patients';
import { Patient } from '@/types/patients_types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface Props {
  params: { lang: string; slug: string };
}

export default async function FinishPage({ params: { lang, slug } }: Props) {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  const {
    data: { id: patientId },
  }: Patient = await getPatient({
    locale: lang,
    slug,
  });

  async function saveResult() {
    'use server';

    await endProgram({
      patientId,
      studentId: parseInt(user.id),
    });

    redirect('/');
  }

  return (
    <>
      <div className='flex h-screen flex-col items-center justify-center'>
        <header className='text-center text-3xl'>
          <h1>Parabéns por terminar o programa</h1>
        </header>
        <main className='flex flex-col items-center space-y-8'>
          <InformationHeader title='Resumo' />
          <InformationBox className='border-none'>
            <Markdown>
              Você terminou o programa de acompanhamento. Obrigado por
              participar!
            </Markdown>
          </InformationBox>
          <form>
            <button className='btn btn-primary' formAction={saveResult}>
              Salvar resultado
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
