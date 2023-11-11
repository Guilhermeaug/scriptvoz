import Image from 'next/image';
import Logo from '@/public/cerebro.png';
import Header from '@/components/Header';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';

export default async function AboutUs({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <>
      <Header color={'evaluation'} center />
      <main className='mx-auto p-3 mt-3 flex flex-col items-center max-w-screen-md'>
        <Image src={Logo} alt='Cérebro humano' />
        <InformationBox title={'Sobre nós'}>
          <article className={'p-4 text-xl '}>
            <section>
              <InformationHeader title={'O que é o ScriptVoz?'} />
              <p>
                O ScriptVoz é um projeto de pesquisa em Fonoaudiologia que visa
                desenvolver um simulador de casos clínicos para o ensino de
                raciocínio clínico em Fonoaudiologia.
              </p>
              <p>
                O projeto é desenvolvido professores do curso de Fonoaudiologia
                da Universidade Federal de Minas Gerais (UFMG).
              </p>
            </section>
            <section>
              <InformationHeader title={'Autores'} />
              <div>
                <p>Lorena Luiza Costa Rosa Nogueira</p>
                <p>Sandro Renato Dias</p>
                <p>Anna Alice Figueirêdo de Almeida</p>
                <p>Renata Rangel Azevedo</p>
                <p>Ana Cristina Côrtes Gama </p>
              </div>
              <InformationHeader title={'Desenvolvedores'} />
              <div>
                <p>Gleiston Assis Filho</p>
                <p>Guilherme Augusto de Oliveira</p>
              </div>
              <InformationHeader title={'Artes Gráficas'} />
              <div>
                <p>Júlia de Oliveira Alves</p>
              </div>
            </section>
          </article>
        </InformationBox>
      </main>
    </>
  );
}
