'use client';

import Link from 'next/link';
import { useProvider } from '@/contexts/Provider';
import Image from 'next/image';
import CerebroBranco from '@/public/cerebro-branco.png';

interface Props {
  center?: boolean;
  color?: string;
}

export default function Header({ center = false, color }: Props) {
  const { color: contextColor } = useProvider();

  return (
    <header className={`navbar bg-${color || contextColor} text-white`}>
      {center ? (
        <>
          <div className={'navbar-start'}></div>
          <div className='navbar-center'>
            <Link className='btn-ghost btn text-4xl normal-case' href='/'>
              Script VOZ
            </Link>
          </div>
          <div className={'navbar-end'}></div>
        </>
      ) : (
        <>
          <div className={'navbar-start space-x-2'}>
            <Image src={CerebroBranco} alt={'Logo do Site'} className="max-w-full" />
            <Link href={'/'} className={'text-3xl'}>
              Script VOZ
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
