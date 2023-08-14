import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import Markdown from '@/components/Markdown';
import { endProgram } from '@/lib/patient';

export default async function Finish() {
  async function saveResult() {
    'use server';

    console.log('hello')

    await endProgram({
      patientId: 7,
      studentId: 24,
    });
  }

  return (
    <div className='p-8'>
      <header className='text-3xl'>
        <h1>Parabéns por terminar o programa</h1>
      </header>
      <main className='mt-6'>
        <section className='flex flex-col items-center'>
          <InformationHeader title='Resumo' />
          <InformationBox className='border-none'>
            <Markdown>
              Você terminou o programa de acompanhamento. Obrigado por
              participar!
            </Markdown>
          </InformationBox>
          <form action=''>
            <button className='btn btn-primary' formAction={saveResult}>
              Salvar resultado
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
