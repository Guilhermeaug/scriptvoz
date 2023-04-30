'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import { languages } from '@/i18n-config';

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <footer className='w-full bg-neutral text-neutral-content shadow mt-auto p-4'>
      <div className='sm:flex sm:items-center sm:justify-between'>
        <Link href='/' className='flex items-center mb-4 sm:mb-0'>
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            ScriptVoz
          </span>
        </Link>
        <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
          <li>
            <Link href='#' className='mr-4 hover:underline md:mr-6 '>
              Sobre
            </Link>
          </li>
          <li>
            <Link href='#' className='mr-4 hover:underline md:mr-6'>
              Política de Privacidade
            </Link>
          </li>
          <li>
            <Link href='#' className='hover:underline'>
              Contato
            </Link>
          </li>
        </ul>
      </div>
      <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
      <div className='text-xs flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-2 items-center'>
          <p>{languages.get(lang)}</p>
          <select
            data-choose-theme
            className='select select-ghost select-sm max-w-xs'
          >
            <option value=''>Default</option>
            <option value='dark'>Dark</option>
            <option value='light'>Light</option>
          </select>
        </div>

        <div className='flex flex-row gap-3'>
          <Image
            src='/logo_cefet.svg'
            width={70}
            height={70}
            alt='Logo da faculdade CEFETMG'
          />
          <Image
            src='/logo_ufmg.svg'
            width={70}
            height={70}
            alt='Logo da faculdade UFMG'
          />
        </div>
      </div>
    </footer>
  );
}
