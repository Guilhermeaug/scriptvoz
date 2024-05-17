import Markdown from '@/components/Markdown';
import { useAuth } from '@/lib/auth';
import { getPageData } from '@/lib/page_data';
import Link from 'next/link';

import { HomePage as HomePageType } from '@/types/page_types';

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: HomePageType = await getPageData({
    path: 'home-page',
    locale: lang,
  });

  const session = await useAuth();

  return (
    <div className='container mx-auto space-y-12 p-4 md:pt-8'>
      <div className='grid place-items-center gap-4 rounded-xl bg-[#DC4D01] p-4'>
        <Markdown className='text-white'>{pageAttributes.front_text}</Markdown>
        <div className='flex justify-end'>
          {session ? (
            <>
              <Link href='patients' locale={lang}>
                <button className='btn btn-primary btn-lg w-64'>
                  {pageAttributes.start_button_text}
                </button>
              </Link>
            </>
          ) : (
            <Link href='sign-in' locale={lang}>
              <button className='btn btn-secondary btn-lg w-64'>
                {pageAttributes.login_button_text}
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className='mx-auto max-w-xl space-y-4'>
        <h2 className='text-2xl'>Materiais Educativos</h2>
        <div className='collapse collapse-arrow border p-6 shadow-xl'>
          <input type='checkbox' />
          <div className='collapse-title text-xl font-medium'>
            <h2 className='text-2xl'>É a sua primeira vez na plataforma?</h2>
            <p className='text-lg'>Clique aqui e aproveite para conhecer nossos materiais</p>
          </div>
          <div className='collapse-content grid gap-3'>
            <Link locale={lang} href='manual'>
              <button className='btn btn-outline w-full justify-start rounded-none'>
                Manual do Software
              </button>
            </Link>
            <Link lang={lang} href='bibliography'>
              <button className='btn btn-outline w-full justify-start rounded-none'>
                Bibliografia do Trabalho
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
