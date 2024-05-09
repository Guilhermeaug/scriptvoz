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

  const textColor = color === 'primary' ? 'text-primary-content' : 'text-white';

  return (
    <article className={style} {...props}>
      {title && (
        <div
          className={`rounded-bl-none rounded-br-none rounded-tl-lg rounded-tr-lg bg-${color} p-2 `}
        >
          <h3
            className={`${textColor} break-words text-center text-lg md:text-3xl`}
          >
            {title}
          </h3>
        </div>
      )}
      {children}
    </article>
  );
}
