export default async function AboutUs({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <>
      <header className='text-3xl'>
        <h1>Sobre nós</h1>
      </header>
      <main className='mt-6'>
        <section className='card shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title'>O que é o ScriptVoz?</h2>
            <p>
              O ScriptVoz é um projeto de pesquisa em Fonoaudiologia que visa
              desenvolver um simulador de casos clínicos para o ensino de
              raciocínio clínico em Fonoaudiologia.
            </p>
            <p>
              O projeto é desenvolvido professores do curso de Fonoaudiologia da
              Universidade Federal de Minas Gerais (UFMG).
            </p>
          </div>
        </section>
        <section className='card shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title'>Autores</h2>
            <div>
              <p>Lorena Luiza Costa Rosa Nogueira</p>
              <p>Sandro Renato Dias</p>
              <p>Anna Alice Figueirêdo de Almeida</p>
              <p>Renata Rangel Azevedo</p>
              <p>Ana Cristina Côrtes Gama </p>
            </div>
            <h2 className='card-title'>Desenvolvedores</h2>
            <div>
              <p>Gleiston Assis Filho</p>
              <p>Guilherme Augusto de Oliveira</p>
            </div>
            <h2 className='card-title'>Artes gráficas</h2>
            <div>
              <p>Júlia de Oliveira Alves</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
