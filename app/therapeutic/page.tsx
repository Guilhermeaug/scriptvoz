import ArrowNavigator from '@/components/ArrowNavigator';
import Diagnostics from '@/components/Diagnostics';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';
import ThemeProvider from '@/contexts/ThemeProvider';
import { getData } from '@/lib/data';
import { TherapeuticData } from '@/types/therapeutic_types';

export const metadata = {
  title: 'Diagnóstico fonoaudiológico',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function TherapeuticStep() {
  const { data }: TherapeuticData = await getData({
    path: 'therapeutics/1?populate=deep',
  });
  const { attributes } = data;
  const { answers } = attributes;

  return (
    <ThemeProvider color='therapeutic'>
      <div className='container mx-auto p-7'>
        <ArrowNavigator href='/diagnostic' direction='left' />
        <header>
          <h1 className='text-center text-4xl'>Decisão terapêutica</h1>
        </header>
        <main className='mt-6 flex flex-col items-center'>
          <InformationHeader title='Resumo do diagnóstico de manifestação' />
          <InformationBox
            className='border-none'
            description={attributes.summary}
          />
          <p className='prose mb-6 p-2'>
            <hr className='separator-line space-y-4 bg-therapeutic' />A partir
            do diagnóstico de manifestação, defina as condutas terapêuticas do
            paciente. Clique nos itens que constituem condutas.
          </p>
          <Diagnostics answers={answers} />
        </main>
      </div>
    </ThemeProvider>
  );
}
