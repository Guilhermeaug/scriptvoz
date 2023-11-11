'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

function buildCrumbs(p: string) {
  const path: string[] = JSON.parse(JSON.stringify(p.split('/')));
  path.shift();

  const steps = {
    evaluation: 'Avaliação Fonoaudiológica',
    diagnostic: 'Diagnóstico',
    therapeutic: 'Decisão Terapêutica',
  };
  const step = path[3] as keyof typeof steps;

  const crumbs = [
    {
      path: '/',
      text: 'Home',
    },
    {
      path: '/patients',
      text: 'Casos Clínicos',
    },
    {
      path: '',
      text: path[2].replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    },
    {
      path: '',
      text: steps[step],
    },
  ];

  return crumbs;
}

export default function BreadCrumb() {
  const pathname = usePathname();
  const path = buildCrumbs(pathname);

  return (
    <div className='text-lg breadcrumbs p-3'>
      <ul>
        {path.map(({ path, text }, index) => (
          <li key={index}>
            <Link href={path}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
