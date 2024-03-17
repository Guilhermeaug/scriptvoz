'use client';

import { useProvider } from '@/contexts/Provider';
import { cn } from '@/util/cn';

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

  const style = cn("rounded-xl border", `border-${color || contextColor}`, className)

  return (
    <article className={style}>
      {title && (
        <div
          className={`rounded-bl-none rounded-br-none rounded-tl-lg rounded-tr-lg bg-${
            color || contextColor
          } p-2 text-center text-4xl text-white`}
        >
          <h2>{title}</h2>
        </div>
      )}
      {children}
    </article>
  );
}
