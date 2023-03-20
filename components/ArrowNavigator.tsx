'use client'

import { ThemeContext } from '@/contexts/ThemeProvider';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { useContext } from 'react';

interface ArrowNavigatorProps {
  direction: 'left' | 'right';
  href: string;
}

export default function ArrowNavigator({
  direction,
  href,
}: ArrowNavigatorProps) {
  const { color } = useContext(ThemeContext);

  const navClasses = classNames(
    `w-24 rounded-br-lg bg-${color} p-2 text-white`,
    {
      'polygon-bl flex justify-end float-right mt-6': direction === 'right',
      'polygon-tr': direction === 'left',
    }
  );

  return (
    <nav className={navClasses}>
      <Link href={href}>
        <button className='btn-ghost btn-square btn'>
          {direction == 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </button>
      </Link>
    </nav>
  );
}
