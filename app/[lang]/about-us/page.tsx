import Image from 'next/image';
import Logo from '@/public/cerebro.png';
import Header from '@/components/Header';
import Provider from '@/contexts/Provider';
import InformationBox from '@/components/InformationBox';
import InformationHeader from '@/components/InformationHeader';

export default async function AboutUs({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <Provider color={'diagnostic'}>
      <Header color={'evaluation'} center />
      <main className='container mx-auto p-3 mt-3 flex flex-col items-center'>
        <Image
          src={Logo}
          alt='Cérebro humano'
          width={200}
          className='self-center'
        />
        <InformationBox title={'Sobre nós'}>
          <section className={'p-4'}>
            <InformationHeader title={'O que é o ScriptVoz?'} />
            <p>
              O ScriptVoz é um projeto de pesquisa em Fonoaudiologia que visa
              desenvolver um simulador de casos clínicos para o ensino de
              raciocínio clínico em Fonoaudiologia.
            </p>
            <p>
              O projeto é desenvolvido professores do curso de Fonoaudiologia da
              Universidade Federal de Minas Gerais (UFMG).
            </p>
          </section>
          <section className={'p-4'}>
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
        </InformationBox>
      </main>
    </Provider>
  );
}
