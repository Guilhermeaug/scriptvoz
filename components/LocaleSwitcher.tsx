'use client';

import '/node_modules/flag-icons/css/flag-icons.min.css';

import { i18n } from '@/i18n-config';
import { cn } from '@/util/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  className?: string;
}

export default function LocaleSwitcher({ className }: Props) {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const style = cn('flex gap-4 px-4', className);

  return (
    <div className={style}>
      {i18n.locales.map((locale) => {
        let flagCode = locale.split('-')[1]?.toLowerCase() || 'un';
        if (flagCode === 'un' && locale.split('-')[0] === 'en') flagCode = 'gb';
        return (
          <Link href={redirectedPathName(locale)} key={locale}>
            <span className={`fi fi-${flagCode}`}></span>
          </Link>
        );
      })}
    </div>
  );
}
