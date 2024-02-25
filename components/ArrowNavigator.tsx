'use client';

import { useProvider } from '@/contexts/Provider';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Link from 'next/link';

interface ArrowNavigatorProps {
  direction: 'left' | 'right';
  href: string;
  ids?: number[];
}

export default function ArrowNavigator({
  direction,
  href,
  ids = [],
}: ArrowNavigatorProps) {
  const { color, completionSet } = useProvider();

  const isCompleted = ids.every((id) => completionSet.has(id));

  const navClasses = classNames(
    `w-24 rounded-br-lg bg-${color} p-2 text-white`,
    {
      'polygon-bl flex justify-end float-right mt-6': direction === 'right',
      'polygon-tr': direction === 'left',
      hidden: !isCompleted && direction === 'right',
    },
  );

  return (
    <nav className={navClasses}>
      <Link href={href}>
        <button className='btn btn-square btn-ghost'>
          {direction == 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </button>
      </Link>
    </nav>
  );
}
