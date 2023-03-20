import ArrowNavigator from '@/components/ArrowNavigator';
import Diagnostics from '@/components/Diagnostics';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import ThemeProvider from '@/contexts/ThemeProvider';
import { getData } from '@/lib/data';
import { DiagnosticData } from '@/types/diagnostic_types';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function EvaluationStep() {
  const { data }: DiagnosticData = await getData({
    path: 'diagnostics/1?populate=deep',
  });
  const { attributes } = data;
  const { answers } = attributes;

  return (
    <ThemeProvider color='diagnostic'>
      <div className='container mx-auto p-7'>
        <ArrowNavigator href='/evaluation' direction='left' />
        <header>
          <h1 className='text-center text-4xl'>Diagnóstico</h1>
        </header>
        <main className='mt-6 flex flex-col items-center'>
          <InformationHeader title='Resumo da avaliação' />
          <InformationBox
            className='border-none'
            description={attributes.summary}
          />
          <p className='prose mb-6 p-2'>
            <hr className='separator-line bg-diagnostic' />A partir dos dados
            das avaliações fonoaudiológica e otorrinolaringológica do paciente,
            clique abaixo nos itens que compõem os seus diagnósticos de
            manifestação.
          </p>
          <Diagnostics answers={answers} />
        </main>
        <ArrowNavigator href='/therapeutic' direction='right' />
      </div>
    </ThemeProvider>
  );
}
