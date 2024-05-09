import InformationHeader from '@/components/InformationHeader';

export default async function AboutUs({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className='container mx-auto mt-3 max-w-screen-md space-y-6 p-3 md:p-8'>
      <h1 className='text-4xl font-bold text-accent'>Sobre nós</h1>
      <section className='text-xl'>
        <div className='prose prose-stone text-justify md:prose-xl'>
          <InformationHeader title='O que é o ScriptVoz?' />
          <p>
            O Script Voz é um projeto de pesquisa em Fonoaudiologia que visa
            desenvolver um simulador de casos clínicos para o ensino de
            raciocínio clínico em Fonoaudiologia.
          </p>
          <p>
            O projeto é desenvolvido professores do curso de Fonoaudiologia da
            Universidade Federal de Minas Gerais (UFMG).
          </p>
        </div>
        <div>
          <div className='prose prose-stone text-justify md:prose-xl md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-1'>
            <div>
              <InformationHeader title='Autores' />
              <p>Lorena Luiza Costa Rosa Nogueira</p>
              <p>Sandro Renato Dias</p>
              <p>Anna Alice Figueirêdo de Almeida</p>
              <p>Renata Rangel Azevedo</p>
              <p>Ana Cristina Côrtes Gama </p>
            </div>
            <div>
              <InformationHeader title='Desenvolvedor' />
              <p>Guilherme Augusto de Oliveira</p>
            </div>
            <div className='col-span-2'>
              <InformationHeader title='Mantedor da plataforma' />
              <p>Vinicius Ferreira Pinheiro</p>
            </div>
          </div>
          <hr className='my-4 border-t border-t-primary py-4 text-primary' />
          <div className='prose prose-stone text-justify md:prose-xl'>
            <InformationHeader title='Contribuidores 2023' />
            <p>Gleiston Assis Filho (CEFET)</p>
            <p>Júlia de Oliveira Alves (UFMG)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
