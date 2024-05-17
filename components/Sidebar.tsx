'use client';

import { EvaluationPage, GeneralPage } from '@/types/page_types';
import { usePathname } from 'next/navigation';
import SidebarShortcuts from './SidebarShortcuts';
import Stepper from './Stepper';

interface Props {
  title: string;
  generalAttributes: GeneralPage['data']['attributes'];
  pageAttributes: EvaluationPage['data']['attributes'];
}

export default function Sidebar({
  title,
  generalAttributes,
  pageAttributes,
}: Props) {
  const pathname = usePathname();

  if (
    !pathname.includes('evaluation') &&
    !pathname.includes('diagnostic') &&
    !pathname.includes('therapeutic')
  ) {
    return null;
  }

  return (
    <aside className='sticky left-0 top-0 col-span-2 hidden h-screen self-start overflow-y-auto bg-stone-100 p-3 lg:block'>
      <Stepper patient={title} generalAttributes={generalAttributes} />
      <SidebarShortcuts
        evaluationAttributes={pageAttributes}
        generalAttributes={generalAttributes}
      />
    </aside>
  );
}
