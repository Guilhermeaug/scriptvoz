'use client';

import { useProvider } from '@/contexts/Provider';

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
    <section className={`rounded-xl border border-${color || contextColor}`}>
      {title && (
        <div
          className={`rounded-bl-none rounded-br-none rounded-tl-lg rounded-tr-lg bg-${
            color || contextColor
          } p-2 text-center text-4xl text-white`}
        >
          <h3>{title}</h3>
        </div>
      )}
      <div className={className}>{children}</div>
    </section>
  );
}
