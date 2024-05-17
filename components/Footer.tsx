import { getPageData } from '@/lib/page_data';
import { FooterPage } from '@/types/page_types';
import Link from 'next/link';

export default async function Footer({ lang }: { lang: string }) {
  const {
    data: { attributes: pageAttributes },
  }: FooterPage = await getPageData({
    path: 'footer',
    locale: lang,
  });

  return (
    <>
      <footer className='footer footer-center rounded bg-base-200 p-10 text-base-content'>
        <nav className='grid grid-flow-col gap-4'>
          <Link href='/about-us' className='link-hover link'>
            {pageAttributes.about_us}
          </Link>
        </nav>
      </footer>
      <footer className='footer footer-center border-t border-base-300 bg-base-200 px-10 py-4 text-base-content'>
        <nav className='grid gap-4 md:grid-flow-col'>
          <p>Contatos</p>
          <a
            href='mailto:anacgama@medicina.ufmg.br'
            className='link-hover link'
          >
            anacgama@medicina.ufmg.br
          </a>
          <a href='mailto:lorenabemdito@gmail.com' className='link-hover link'>
            lorenabemdito@gmail.com
          </a>
        </nav>
      </footer>
    </>
  );
}
