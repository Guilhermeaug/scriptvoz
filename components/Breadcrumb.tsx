'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

function buildCrumbs(p: string) {
  const path = JSON.parse(JSON.stringify(p.split('/')));
  path.shift();

  path[0] = 'Home';
  path[1] = 'Casos Clínicos';
  path[2] = path[2];
  path[3] = 'Decisão Terapêutica';

  return path;
}

export default function BreadCrumb() {
  const pathname = usePathname();

  const path = buildCrumbs(pathname);
  console.log(path);

  return (
    <div className='text-lg breadcrumbs p-3'>
      <ul>
        {path.map((crumb: string) => (
          <li key={crumb}>
            <Link href={''}>{crumb}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
