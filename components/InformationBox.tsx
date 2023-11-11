'use client';

import { useProvider } from '@/contexts/Provider';
import { twMerge } from 'tailwind-merge';

interface InformationBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  title?: string;
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
      className={twMerge(
        `rounded-xl border border-${color || contextColor}`,
        className,
      )}
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
