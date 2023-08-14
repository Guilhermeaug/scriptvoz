'use client';

import { ProviderContext } from '@/contexts/Provider';
import { useContext } from 'react';

interface SectionHeaderProps {
  title: string;
}

export default function InformationHeader({ title }: SectionHeaderProps) {
  const { color } = useContext(ProviderContext);

  return (
    <div className='my-4'>
      <h2 className='mt-6 break-words text-center text-2xl'>{title}</h2>
      <hr className={`separator-line bg-${color}`} />
    </div>
  );
}
