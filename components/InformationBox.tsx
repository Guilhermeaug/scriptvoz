'use client';

import { useProvider } from '@/contexts/Provider';

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
  const { color } = useProvider();

  const borderColor = `border-${color}`;
  const bgColor = `bg-${color}`;

  return (
    <div className={`border ${borderColor} ${className}`}>
      {title && (
        <h3
          className={`w-3/4 rounded-tr-3xl ${bgColor} p-1 text-xl text-white`}
        >
          {title}
        </h3>
      )}
      <div className='p-2'>{children}</div>
    </div>
  );
}
