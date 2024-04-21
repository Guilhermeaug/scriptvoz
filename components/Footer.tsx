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
    <footer className='footer footer-center mt-10 rounded bg-base-200 p-10 text-base-content'>
      <nav className='grid grid-flow-col gap-4'>
        <Link href='/about-us' className='link-hover link'>
          {pageAttributes.about_us}
        </Link>
        <Link href='/' className='link-hover link'>
          {pageAttributes.bibliographic_reference}
        </Link>
        <a href='mailto:scriptvoz@gmail.com' className='link-hover link'>
          {pageAttributes.contact}
        </a>
      </nav>
    </footer>
  );
}
