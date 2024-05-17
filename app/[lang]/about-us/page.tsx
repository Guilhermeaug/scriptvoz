import BlocksRendererClient from '@/components/BlocksRendererClient';
import InformationHeader from '@/components/InformationHeader';
import { getPageData } from '@/lib/page_data';
import { AboutUsPage as AboutUsPageAttributes } from '@/types/page_types';

export default async function AboutUsPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: AboutUsPageAttributes = await getPageData({
    path: 'about-us-page',
    locale: lang,
  });

  return (
    <div className='container mx-auto mt-3 max-w-screen-md space-y-6 p-3 md:p-8'>
      <h1 className='text-4xl font-bold text-accent'>Sobre nós</h1>
      <section className='text-xl'>
        <div className='prose prose-stone text-justify md:prose-xl'>
          <InformationHeader title='O que é o ScriptVoz?' />
          <BlocksRendererClient content={pageAttributes.text} />
        </div>
        <div>
          <div className='prose prose-stone text-justify md:prose-xl md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-1'>
            <div>
              <InformationHeader title={pageAttributes.authors} />
              <p>Lorena Luiza Costa Rosa Nogueira</p>
              <p>Sandro Renato Dias</p>
              <p>Anna Alice Figueirêdo de Almeida</p>
              <p>Renata Rangel Azevedo</p>
              <p>Ana Cristina Côrtes Gama </p>
            </div>
            <div>
              <InformationHeader title={pageAttributes.developer} />
              <p>Guilherme Augusto de Oliveira</p>
            </div>
            <div className='col-span-2'>
              <InformationHeader title={pageAttributes.maintainer} />
              <p>Vinicius Ferreira Pinheiro</p>
            </div>
          </div>
          <hr className='my-4 border-t border-t-primary py-4 text-primary' />
          <div className='prose prose-stone text-justify md:prose-xl'>
            <InformationHeader title={pageAttributes.contributors} />
            <p>Gleiston Assis Filho (CEFET)</p>
            <p>Júlia de Oliveira Alves (UFMG)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
