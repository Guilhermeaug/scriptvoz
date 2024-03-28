'use client';

import CEFETMG from '@/public/cefet.png';
import UFMG from '@/public/logo-medicina.png';
import { cn } from '@/util/cn';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Navbar({ className, ...props }: Props) {
  const style = cn('navbar bg-neutral text-neutral-content', className);

  return (
    <div className={style} {...props}>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-xl md:text-2xl'>
          Script Voz
        </Link>
      </div>
      <div className='flex-none gap-3 px-2'>
        <Image src={UFMG} alt={'Logo da UFMG'} className='w-24 md:w-28' />
        <Image src={CEFETMG} alt={'Logo do CEFETMG'} className='w-14 md:w-16' />
      </div>
    </div>
  );
}
