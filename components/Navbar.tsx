'use client';

import Logo from '@/public/logo-scriptvoz.png';
import { cn } from '@/util/cn';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Navbar({ className, ...props }: Props) {
  const style = cn('navbar bg-neutral text-neutral-content', className);

  return (
    <div className={style} {...props}>
      <div className='flex-1'>
        <Image
          src={Logo}
          alt={'Logo da UFMG'}
          width='0'
          height='0'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='h-auto w-16 max-w-full flex-shrink-0 flex-grow-0 cursor-pointer'
        />
        <Link href='/' className='btn btn-ghost text-xl md:text-2xl'>
          Script Voz
        </Link>
      </div>
    </div>
  );
}
