'use client';

import '/node_modules/flag-icons/css/flag-icons.min.css';

import { i18n } from '@/i18n-config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className='flex flex-row gap-2'>
      {i18n.locales.map((locale) => {
        const flagCode = locale.split('-')[1]?.toLowerCase() || 'un';
        return (
          <Link href={redirectedPathName(locale)} key={locale}>
            <span className={`fi fi-${flagCode}`}></span>
          </Link>
        );
      })}
    </div>
  );
}
