'use client';

import { ThemeContext } from '@/contexts/ThemeProvider';
import { useContext } from 'react';
import Markdown from './Markdown';
interface InformationBoxProps {
  className?: string;
  title?: string;
  children: React.ReactNode;
}

export default function InformationBox({
  className,
  title,
  children,
}: InformationBoxProps) {
  const { color } = useContext(ThemeContext);

  return (
    <div className={`border border-${color} ${className}`}>
      {title && (
        <h3
          className={`w-3/4 rounded-tr-3xl bg-${color} p-1 text-xl text-white`}
        >
          {title}
        </h3>
      )}
      <div className='p-2'>
        {children}
      </div>
    </div>
  );
}
