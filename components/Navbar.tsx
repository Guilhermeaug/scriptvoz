'use client';

import { cn } from '@/util/cn';
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
    </div>
  );
}
