import { cn } from '@/util/cn';

interface InformationBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  title?: string;
}

export default function InformationBox({
  className,
  color = 'primary',
  title,
  children,
  ...props
}: InformationBoxProps) {
  const style = cn('rounded-xl border', `border-${color}`, className);

  return (
    <article className={style} {...props}>
      {title && (
        <div
          className={`rounded-bl-none rounded-br-none rounded-tl-lg rounded-tr-lg bg-${color} p-2 text-center text-white`}
        >
          <h3 className='break-words text-lg md:text-3xl'>{title}</h3>
        </div>
      )}
      {children}
    </article>
  );
}
