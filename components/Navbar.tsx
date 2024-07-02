'use client';

import Logo from '@/public/logo-scriptvoz.png';
import { cn } from '@/util/cn';
import { navigateTo } from '@/util/navigateTo';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

export default function Navbar({ lang, className, ...props }: Props) {
  const pathname = usePathname();

  const style = cn('navbar bg-neutral text-neutral-content flex justify-between', className);
  const isInHomePage = pathname.split('/').length === 2;

  return (
    <div className={style} {...props}>
      <div>
        <Image
          src={Logo}
          alt={'Logo da UFMG'}
          width='0'
          height='0'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='h-auto w-16 max-w-full flex-shrink-0 flex-grow-0 cursor-pointer'
        />
        <Link
          href={navigateTo(lang, '')}
          className='btn btn-ghost text-xl md:text-2xl'
        >
          Script Voz
        </Link>
      </div>
      {isInHomePage && <LocaleSwitcher className='ml-auto' />}
    </div>
  );
}
