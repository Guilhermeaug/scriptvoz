import BlocksRendererClient from '@/components/BlocksRendererClient';
import InformationHeader from '@/components/InformationHeader';
import { getPageData } from '@/lib/page_data';
import Guilherme from '@/public/people/GuilhermeAugusto.jpg';
import { AboutUsPage as AboutUsPageAttributes } from '@/types/page_types';
import Image from 'next/image';

import styles from './styles.module.css';

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
    <div className='container mx-auto mt-6 space-y-4 p-4'>
      <h1 className='text-4xl font-bold'>{pageAttributes.what_is}</h1>
      <div>
        <BlocksRendererClient content={pageAttributes.text} />
      </div>
      <div>
        <Member />
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
    </div>
  );
}

function Member() {
  return (
    <div className=''>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            className='block h-auto w-96 max-w-full rounded-lg shadow-md'
            src={Guilherme}
            alt='Picture of Guilherme Augusto de Oliveira'
          />
        </div>
        <div className={styles.text}>Guilherme Augusto de Oliveira</div>
      </div>
    </div>
  );
}
