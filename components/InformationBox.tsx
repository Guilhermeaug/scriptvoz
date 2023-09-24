'use client';

import { useProvider } from '@/contexts/Provider';
import { ReactNode } from 'react';

interface InformationBoxProps {
  className?: string;
  color?: string;
  title?: string;
  children: ReactNode;
}

export default function InformationBox({
  className,
  color,
  title,
  children,
}: InformationBoxProps) {
  const { color: contextColor } = useProvider();

  return (
    <div
      className={`rounded-xl border border-${
        color || contextColor
      } ${className}`}
    >
      {title && (
        <div
          className={`rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none bg-${
            color || contextColor
          } text-center p-2 text-4xl text-white`}
        >
          <h3>{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
