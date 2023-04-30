import LocaleSwitcher from '@/components/LocaleSwitcher';
import Markdown from '@/components/Markdown';
import { getPageData } from '@/lib/data';
import { HomePage } from '@/types/home_types';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Script Voz',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { data: page }: HomePage = await getPageData({
    path: 'home-page',
    locale: lang,
  });
  const { attributes: pageAttributes } = page;

  return (
    <>
      <header className='navbar rounded-lg bg-neutral text-neutral-content'>
        <div className='flex-1'>
          <Link className='btn-ghost btn text-xl normal-case' href='/'>
            ScriptVoz
          </Link>
        </div>
        <div className='navbar-end'>
          <LocaleSwitcher />
        </div>
      </header>
      <main className='mt-3'>
        <div className='card bg-[#004172] shadow-xl lg:card-side'>
          <Image
            src='/raciocinio_clinico.png'
            alt='Cérebro humano'
            width={325}
            height={325}
            className='self-center'
          />
          <div className='card-body bg-base-100'>
            <h2 className='text-6xl font-bold'>Script Voz</h2>
            <Markdown className='prose-xl'>
              {pageAttributes.front_text}
            </Markdown>
            <Markdown className='prose-xl'>{pageAttributes.call_text}</Markdown>
            <div className='card-actions justify-end'>
              <Link href={`${lang}/patients`}>
                <button className='btn-primary btn'>
                  {pageAttributes.button_text}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
